<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request) {
        $query = Product::query();

        if ($request->has('search')) {
            $query->where('name', 'like','%'. $request->search .'%');
        }
    
        $products = $query->paginate(10);

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

    public function update(Request $request, Product $product) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'active'=> 'required|boolean',
        ]);

        $product->update($validatedData);

        return response()->json($product, 200);
    }
}
