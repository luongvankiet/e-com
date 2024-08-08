<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Actions\ProductActions\UpdateOrCreateProductVariantAction;
use App\Http\Controllers\Controller;
use App\Http\DTOs\ProductVariantDTO;
use App\Http\QueryFilters\ProductVariantQueryFilter;
use App\Http\Requests\StoreProductVariantRequest;
use App\Http\Requests\UpdateProductVariantRequest;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Product $product)
    {
        $variants = ProductVariantQueryFilter::make(
            ProductVariant::query()
                ->productId($product->id)
                ->with('options')
        );

        return redirect()->route('products.edit', $product->id)
            ->with([
                'variants' => $variants->all(),
                'variants_count' => $variants->total(),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Product $product)
    {
        return Inertia::render('dashboard/product-variants/create', [
            'product' => $product->loadMissing([
                'featuredImage',
                'variants.featuredImage',
                'options' => function ($query) use ($product) {
                    $query->with('values', function ($query) use ($product) {
                        $query->where('product_id', $product->id);
                    });
                },
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreProductVariantRequest $request,
        UpdateOrCreateProductVariantAction $updateOrCreateProductVariantAction,
        Product $product
    ) {
        $variant = $updateOrCreateProductVariantAction->execute(
            ProductVariantDTO::fromRequest($request),
            $product,
            new ProductVariant()
        );

        return redirect()->route('variants.edit', ['product' => $product, 'variant' => $variant]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product, ProductVariant $variant)
    {
        return Inertia::render('dashboard/product-variants/show', [
            'product' => $product,
            'variant' => $variant,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product, ProductVariant $variant)
    {
        return Inertia::render('dashboard/product-variants/edit', [
            'product' => $product->loadMissing([
                'featuredImage',
                'variants.featuredImage',
                'options' => function ($query) use ($product) {
                    $query->with('values', function ($query) use ($product) {
                        $query->where('product_id', $product->id);
                    });
                },
            ]),
            'variant' => $variant->loadMissing(['options', 'image']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateProductVariantRequest $request,
        UpdateOrCreateProductVariantAction $updateOrCreateProductVariantAction,
        Product $product,
        ProductVariant $variant
    ) {
        $updateOrCreateProductVariantAction->execute(
            ProductVariantDTO::fromRequest($request),
            $product,
            $variant
        );

        return redirect()->back()
            ->with('status', 'success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, ProductVariant $variant)
    {
        $variant->delete();

        return redirect()->route('products.edit', ['product' => $product]);
    }

    public function deleteMany(Request $request)
    {
        try {
            $request->validate([
                'ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            ProductVariant::whereIn('id', $request->input('ids'))->delete();

            return back()->with('success', __('Selected items have been deleted successfully.'));
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }
}
