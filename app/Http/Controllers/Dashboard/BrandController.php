<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Actions\BrandActions\StoreBrandAction;
use App\Http\Actions\BrandActions\UpdateBrandAction;
use App\Http\Controllers\Controller;
use App\Http\DTOs\BrandDTO;
use App\Http\QueryFilters\BrandQueryFilter;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Brand::class);

        $brands = BrandQueryFilter::make(
            Brand::query()->with(['image', 'tags'])
        );

        return Inertia::render('dashboard/brands/index', [
            'brands' => $brands->all(),
            'categories' => Category::all(),
            'total' => $brands->total(),
            'all_count' => $total = Brand::count(),
            'draft_count' => $draft = Brand::whereNull('published_at')->count(),
            'published_count' => $total - $draft,
            'trashed_count' => Brand::onlyTrashed()->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Brand::class);

        return Inertia::render('dashboard/brands/create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreBrandRequest $request,
        StoreBrandAction $storeBrandAction
    ) {
        return redirect()->route(
            'brands.edit',
            $storeBrandAction->execute(
                BrandDTO::fromRequest($request)
            )
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        Gate::authorize('view', $brand);

        return Inertia::render('dashboard/brands/edit', [
            'brand' => $brand->loadMissing(['categories', 'image', 'tags']),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateBrandRequest $request,
        UpdateBrandAction $updateBrandAction,
        Brand $brand
    ) {
        $updateBrandAction->execute(BrandDTO::fromRequest($request), $brand);
        return redirect()->back()->with('status', 'success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        Gate::authorize('delete', $brand);
        $brand->delete();

        return redirect()->route('brands.index');
    }

    public function deleteMany(Request $request)
    {
        Gate::authorize('delete', Brand::class);

        try {
            $request->validate([
                'ids' => 'required|array|min:1',
            ]);

            $existingIds = $this->findNonExistingIds($request->input('ids'));

            Brand::onlyTrashed()->whereIn('id', $existingIds)->forceDelete();
            Brand::whereIn('id', $existingIds)->whereNull('deleted_at')->delete();

            return back()->with('success', __('Selected items have been deleted successfully.'));
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function restoreMany(Request $request)
    {
        Gate::authorize('restore', Brand::class);

        try {
            $request->validate([
                'ids' => 'required|array|min:1',
            ]);

            $ids = $this->findNonExistingIds($request->input('ids'), true);

            Brand::whereIn('id', $ids)->restore();

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
        $existingIds = Brand::whereIn('id', $ids)
            ->withTrashed()
            ->pluck('id')
            ->toArray();

        // Compare with the original array to find non-existing IDs
        $nonExistingIds = array_diff($ids, $existingIds);

        if (!empty($nonExistingIds)) {
            throw new \Exception('Brands with ids [' . implode(',', $nonExistingIds) . '] not found!');
        }

        return $existingIds;
    }
}
