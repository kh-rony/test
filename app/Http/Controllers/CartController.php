<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    // Display cart for authenticated user
    public function index()
    {
        $cart = auth()->user()->cart()->with('items.product')->first();

        return Inertia::render('Cart/Index', [
            'cart' => $cart,
        ]);
    }

    // Add product to cart
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->stock_quantity < 1) {
            return response()->json(['message' => 'Product out of stock'], 400);
        }

        $cart = auth()->user()->cart()->firstOrCreate();

        $cart->items()->updateOrCreate(
            ['product_id' => $product->id],
            ['quantity' => DB::raw('quantity + 1')]
        );

        return response()->json(['message' => 'Product added to cart']);
    }

    // Update quantity of a cart item
    public function update(Request $request, $itemId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('id', $itemId)
            ->whereHas('cart', fn($q) => $q->where('user_id', auth()->id()))
            ->firstOrFail();

        // Check stock
        if ($cartItem->product->stock_quantity < $request->quantity) {
            return response()->json(['message' => 'Not enough stock'], 400);
        }

        $cartItem->update([
            'quantity' => $request->quantity,
        ]);

        return response()->json(['message' => 'Quantity updated']);
    }

    // Remove item from cart
    public function remove($itemId)
    {
        $cartItem = CartItem::where('id', $itemId)
            ->whereHas('cart', fn($q) => $q->where('user_id', auth()->id()))
            ->firstOrFail();

        $cartItem->delete();

        return response()->json(['message' => 'Item removed']);
    }
}
