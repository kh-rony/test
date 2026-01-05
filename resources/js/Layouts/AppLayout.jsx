import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href={route('products.index')}
                        className="text-2xl font-bold text-indigo-600"
                    >
                        SimpleShop
                    </Link>

                    {/* Nav Links */}
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

                        {/* User Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-indigo-600 focus:outline-none"
                            >
                                {auth.user.name}
                                <svg
                                    className={`w-4 h-4 transition ${
                                        open ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                                    <Link
                                        href={route('profile.edit')}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="py-10">{children}</main>
        </div>
    );
}
