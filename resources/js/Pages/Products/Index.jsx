import React from 'react';
import { router } from '@inertiajs/react';

export default function ProductsIndex({ products }) {

    const handleAddToCart = (productId) => {
        router.post(route('cart.add'), { product_id: productId }, {
            onSuccess: () => alert('Product added to cart!'),
            onError: (errors) => alert(errors.message || 'Something went wrong'),
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="mb-2">Price: ${product.price}</p>
                        <p className="mb-4">Stock: {product.stock_quantity}</p>
                        <button
                            onClick={() => handleAddToCart(product.id)}
                            className={`px-4 py-2 rounded text-white ${
                                product.stock_quantity < 1
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            disabled={product.stock_quantity < 1}
                        >
                            {product.stock_quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
