<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Display all products
    public function index()
    {
        // Load all products with stock info
        $products = Product::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }
}
