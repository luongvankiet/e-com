<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Actions\ProductActions\UpdateProductAction;
use App\Http\Actions\ProductActions\StoreProductAction;
use App\Http\Controllers\Controller;
use App\Http\DTOs\ProductDTO;
use App\Http\QueryFilters\ProductQueryFilter;
use App\Http\QueryFilters\ProductVariantQueryFilter;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Option;
use App\Models\Product;
use App\Models\ProductVariant;
use App\ProductStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = ProductQueryFilter::make(Product::query()->with('image'));

        return Inertia::render('dashboard/products/index', [
            'products' => $products->all(),
            'total' => $products->total(),
            'all_count' => $total = Product::count(),
            'draft_count' => $draft = Product::whereNull('published_at')->count(),
            'published_count' => $total - $draft,
            'trashed_count' => Product::onlyTrashed()->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/products/create', [
            'product_statuses' => ProductStatus::cases(),
            'categories' => Category::all(),
            'brands' => Brand::all(),
            'options' => Option::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreProductRequest $request,
        StoreProductAction $storeProductAction
    ) {
        return redirect()->route(
            'products.edit',
            $storeProductAction->execute(
                ProductDTO::fromRequest($request)
            )
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $variants = ProductVariantQueryFilter::make(
            ProductVariant::query()
                ->productId($product->id)
                ->with('options')
        );

        return Inertia::render('dashboard/products/edit', [
            'product' => $product->loadMissing([
                'featuredImage',
                'images',
                'categories',
                'brand',
                'options' => function ($query) use ($product) {
                    $query->with('values', function ($query) use ($product) {
                        $query->where('product_id', $product->id);
                    });
                },
                'variants.options'
            ]),
            'variants' => $variants->all(),
            'variants_count' => $variants->total(),
            'options' => Option::all(),
            'product_statuses' => ProductStatus::cases(),
            'categories' => Category::all(),
            'brands' => Brand::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateProductRequest $request,
        UpdateProductAction $updateProductAction,
        Product $product
    ) {
        $updateProductAction->execute(ProductDTO::fromRequest($request), $product);
        return redirect()->back()
            ->withInput($request->all())
            ->with('status', 'success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);
        $product->delete();

        return redirect()->route('products.index');
    }

    public function deleteMany(Request $request)
    {
        Gate::authorize('delete', Product::class);

        try {
            $request->validate([
                'ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            $existingIds = $this->findNonExistingIds($request->input('ids'));

            Product::onlyTrashed()->whereIn('id', $existingIds)->forceDelete();
            Product::whereIn('id', $existingIds)->whereNull('deleted_at')->delete();

            return back()->with('success', __('Selected items have been deleted successfully.'));
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function restoreMany(Request $request)
    {
        Gate::authorize('restore', Product::class);

        try {
            $request->validate([
                'ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            $ids = $this->findNonExistingIds($request->input('ids'), true);

            Product::whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', __('Selected items have been restored successfully.'));
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    private function findNonExistingIds(array $ids = [])
    {
        // Retrieve all IDs that exist in the database
        $existingIds = Product::whereIn('id', $ids)
            ->withTrashed()
            ->pluck('id')
            ->toArray();

        // Compare with the original array to find non-existing IDs
        $nonExistingIds = array_diff($ids, $existingIds);

        if (!empty($nonExistingIds)) {
            throw new \Exception('Products with ids [' . implode(',', $nonExistingIds) . '] not found!');
        }

        return $existingIds;
    }
}
