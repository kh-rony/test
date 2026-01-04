<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Show the authenticated user's cart.
     */
    public function index()
    {
        // Get cart or create if it doesn't exist
        $cart = auth()->user()->cart()->firstOrCreate();

        // Null-safe: if cart has no items, frontend still gets empty array
        return Inertia::render('Cart/Index', [
            'cart' => $cart,
        ]);
    }

    /**
     * Add a product to the cart or increment quantity.
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->stock_quantity < 1) {
            return back()->withErrors(['stock' => 'Product out of stock']);
        }

        $cart = auth()->user()->cart()->firstOrCreate();

        $cartItem = $cart->items()->firstOrCreate(
            ['product_id' => $product->id],
            ['quantity' => 0, 'price' => $product->price]
        );

        // Increment quantity, but do not exceed stock
        if ($cartItem->quantity + 1 > $product->stock_quantity) {
            return back()->withErrors(['stock' => 'Not enough stock available']);
        }

        $cartItem->increment('quantity');

        // Update price in case product price changed
        $cartItem->update(['price' => $product->price]);

        return back();
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update(Request $request, CartItem $item)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $product = $item->product;

        if ($request->quantity > $product->stock_quantity) {
            return back()->withErrors(['stock' => 'Not enough stock available']);
        }

        $item->update(['quantity' => $request->quantity]);

        return back();
    }

    /**
     * Remove an item from the cart.
     */
    public function remove(CartItem $item)
    {
        $item->delete();

        return back();
    }
}
