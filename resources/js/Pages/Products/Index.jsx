import React from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function ProductsIndex({ products }) {

    const handleAddToCart = (productId) => {
        router.post(route('cart.add'), { product_id: productId }, {
            onSuccess: () => toast.success('Product added to cart!'),
            onError: (errors) => toast.error(errors.message || 'Something went wrong'),
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all p-6 flex flex-col justify-between relative"
                    >
                        {/* Product Image */}
                        <img
                            src={`https://via.placeholder.com/300x200?text=${product.name}`}
                            alt={product.name}
                            className="rounded-md mb-4 w-full h-48 object-cover"
                        />

                        {/* Product Name */}
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

                        {/* Price Badge */}
                        <p className="text-lg font-bold mb-2">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">${product.price}</span>
                        </p>

                        {/* Stock Indicator */}
                        <p className={`mb-4 font-semibold ${
                            product.stock_quantity > 5 ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {product.stock_quantity} in stock
                        </p>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => handleAddToCart(product.id)}
                            className={`w-full py-2 rounded-xl text-white font-semibold shadow-md transition transform hover:scale-105 ${
                                product.stock_quantity < 1
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600'
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
