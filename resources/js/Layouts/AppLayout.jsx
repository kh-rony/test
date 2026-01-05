import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo / Brand */}
                    <Link
                        href={route('products.index')}
                        className="text-2xl font-bold text-indigo-600"
                    >
                        SimpleShop
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href={route('products.index')}
                            className="font-semibold text-gray-700 hover:text-indigo-600"
                        >
                            Products
                        </Link>

                        <Link
                            href={route('cart.index')}
                            className="font-semibold text-gray-700 hover:text-indigo-600"
                        >
                            Cart
                        </Link>

                        <Link
                            href={route('orders.index')}
                            className="font-semibold text-gray-700 hover:text-indigo-600"
                        >
                            My Orders
                        </Link>

                        {/* User */}
                        <span className="text-sm text-gray-500">
                            {auth.user.name}
                        </span>

                        {/* Logout */}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-red-600 font-semibold hover:text-red-800"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="py-10">
                {children}
            </main>
        </div>
    );
}
