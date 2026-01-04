import React from 'react';
import { router } from '@inertiajs/react';

export default function Cart({ cart }) {

    const handleRemove = (itemId) => {
        router.delete(route('cart.remove', itemId), {
            onSuccess: () => alert('Item removed from cart!'),
            onError: (errors) => alert(errors.message || 'Error removing item'),
        });
    };

    const handleUpdate = (itemId, quantity) => {
        router.patch(route('cart.update', itemId), { quantity }, {
            onSuccess: () => alert('Quantity updated!'),
            onError: (errors) => alert(errors.message || 'Error updating quantity'),
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cart?.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cart.items.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 shadow">
                            <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    Remove
                                </button>

                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleUpdate(item.id, parseInt(e.target.value))
                                    }
                                    className="border rounded px-2 py-1 w-16"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
