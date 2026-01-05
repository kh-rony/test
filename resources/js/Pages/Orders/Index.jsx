import React from 'react';
import AppLayout from "@/Layouts/AppLayout.jsx";

export default function OrdersIndex({ orders }) {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-10 text-center">
                My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500 py-24">
                    <p className="text-xl">You haven’t placed any orders yet 📦</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map(order => (
                        <div
                            key={order.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6"
                        >
                            {/* Order Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Order #{order.id}
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        Placed on {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="text-lg font-bold">
                                    ${Number(order.total).toFixed(2)}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-4">
                                {order.items.map(item => (
                                    <div
                                        key={item.id}
                                        className="flex gap-6 items-center border rounded-lg p-4"
                                    >
                                        {/* Product Image */}
                                        <img
                                            src={`https://placehold.co/120x90?text=${item.product.name}`}
                                            alt={item.product.name}
                                            className="rounded-md w-28 h-20 object-cover"
                                        />

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                ${Number(item.price).toFixed(2)} × {item.quantity}
                                            </p>
                                        </div>

                                        {/* Item Total */}
                                        <div className="font-bold">
                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="border-t mt-6 pt-4 flex justify-end text-lg font-bold">
                                Total: ${Number(order.total).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

OrdersIndex.layout = page => <AppLayout>{page}</AppLayout>;
