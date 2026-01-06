import React from 'react';
import {router} from '@inertiajs/react';
import toast from 'react-hot-toast';
import AppLayout from "@/Layouts/AppLayout.jsx";

export default function Cart({cart}) {
    const items = cart?.items || [];

    const updateQuantity = (itemId, quantity) => {
        if (quantity < 1) return;

        router.patch(
            route('cart.update', itemId),
            {quantity},
            {
                preserveScroll: true,
                onSuccess: () => toast.success('Cart updated'),
                onError: () => toast.error('Failed to update cart'),
            }
        );
    };

    const removeItem = (itemId) => {
        router.delete(route('cart.remove', itemId), {
            preserveScroll: true,
            onSuccess: () => toast.success('Item removed'),
            onError: () => toast.error('Failed to remove item'),
        });
    };

    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-10 text-center">
                Your Shopping Cart
            </h1>

            {items.length === 0 ? (
                <div className="text-center text-gray-500 py-24">
                    <p className="text-xl">Your cart is empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 flex gap-6">
                                {/* Product Image */}
                                <img
                                    src={`https://placehold.co/150x120?text=${item.product.name}`}
                                    alt={item.product.name}
                                    className="rounded-lg w-36 h-28 object-cover"
                                />

                                {/* Product Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-1">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-gray-600">
                                            ${Number(item.price).toFixed(2)} each
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center border rounded-lg overflow-hidden">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                            >
                                                −
                                            </button>

                                            <span className="px-4 font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                                disabled={item.quantity >= item.product.stock_quantity}
                                                className={`px-3 py-1 transition ${
                                                    item.quantity >= item.product.stock_quantity
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                                title={
                                                    item.quantity >= item.product.stock_quantity
                                                        ? 'No more stock available'
                                                        : 'Increase quantity'
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-600 hover:text-red-800 font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right font-bold text-lg">
                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
                        <h2 className="text-2xl font-bold mb-6">
                            Order Summary
                        </h2>

                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="border-t pt-4 mb-6 flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => router.post(route('checkout'))}
                            className="w-full py-3 rounded-xl text-white font-semibold shadow-md
    bg-gradient-to-r from-green-500 to-emerald-600
    hover:from-emerald-500 hover:to-green-600
    transition transform hover:scale-105"
                        >
                            Place order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

Cart.layout = page => <AppLayout>{page}</AppLayout>;
