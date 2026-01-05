<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use App\Jobs\LowStockNotification;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = auth()->user()
            ->orders()
            ->with('items.product')
            ->latest()
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }
    public function checkout()
    {
        $user = auth()->user();
        $cart = $user->cart()->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return back()->withErrors('Cart is empty');
        }

        DB::transaction(function () use ($user, $cart) {
            // Calculate total
            $total = $cart->items->sum(
                fn ($item) => $item->price * $item->quantity
            );

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
            ]);

            foreach ($cart->items as $item) {
                $product = $item->product;

                // Stock validation
                if ($item->quantity > $product->stock_quantity) {
                    throw new \Exception("Insufficient stock for {$product->name}");
                }

                // Create order item
                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                ]);

                // Reduce stock
                $product->decrement('stock_quantity', $item->quantity);

                // Dispatch low stock notification
                $threshold = config('shop.low_stock_threshold');
                if ($product->stock_quantity <= $threshold) {
                    LowStockNotification::dispatch($product);
                }
            }

            // Clear cart
            $cart->items()->delete();
        });

        return redirect()
            ->route('products.index')
            ->with('success', 'Order placed successfully!');
    }
}
