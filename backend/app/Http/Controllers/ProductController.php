<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() {
        $products = Product::paginate(10);

        return response()->json($products);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'active'=> 'required|boolean',
        ]);

        $product = Product::create($validatedData);

        return response()->json($product);
    }
}
