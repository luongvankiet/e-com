<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Actions\CategoryActions\UpdateCategoryAction;
use App\Http\Actions\CategoryActions\StoreCategoryAction;
use App\Http\Controllers\Controller;
use App\Http\DTOs\CategoryDTO;
use App\Http\QueryFilters\CategoryQueryFilter;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = CategoryQueryFilter::make(
            Category::query()->with(['parent', 'image', 'tags', 'brands'])
        );

        return Inertia::render('dashboard/categories/index', [
            'categories' => $categories->all(),
            'brands' => Brand::all(),
            'total' => $categories->total(),
            'all_count' => $total = Category::count(),
            'draft_count' => $draft = Category::whereNull('published_at')->count(),
            'published_count' => $total - $draft,
            'trashed_count' => Category::onlyTrashed()->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Category::class);

        return Inertia::render('dashboard/categories/create', [
            'categories' => Category::whereNull('parent_id')->get(),
            'brands' => Brand::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreCategoryRequest $request,
        StoreCategoryAction $storeCategoryAction
    ) {
        return redirect()->route(
            'categories.edit',
            $storeCategoryAction->execute(
                CategoryDTO::fromRequest($request)
            )
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        Gate::authorize('update', Category::class);

        return Inertia::render('dashboard/categories/edit', [
            'category' => $category->loadMissing(['parent', 'image', 'brands']),
            'categories' => Category::whereNull('parent_id')->get(),
            'brands' => Brand::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateCategoryRequest $request,
        UpdateCategoryAction $updateCategoryAction,
        Category $category
    ) {
        $updateCategoryAction->execute(CategoryDTO::fromRequest($request), $category);
        return redirect()->back()->with('status', 'success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Gate::authorize('delete', $category);
        $category->delete();

        return redirect()->route('categories.index');
    }

    public function deleteMany(Request $request)
    {
        Gate::authorize('delete', Category::class);

        try {
            $request->validate([
                'ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            $existingIds = $this->findNonExistingIds($request->input('ids'));

            Category::onlyTrashed()->whereIn('id', $existingIds)->forceDelete();
            Category::whereIn('id', $existingIds)->whereNull('deleted_at')->delete();

            return back()->with('success', __('Selected items have been deleted successfully.'));
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function restoreMany(Request $request)
    {
        Gate::authorize('restore', Category::class);

        try {
            $request->validate([
                'ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            $ids = $this->findNonExistingIds($request->input('ids'), true);

            Category::whereIn('id', $ids)->restore();

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
        $existingIds = Category::whereIn('id', $ids)
            ->withTrashed()
            ->pluck('id')
            ->toArray();

        // Compare with the original array to find non-existing IDs
        $nonExistingIds = array_diff($ids, $existingIds);

        if (!empty($nonExistingIds)) {
            throw new \Exception('Categories with ids [' . implode(',', $nonExistingIds) . '] not found!');
        }

        return $existingIds;
    }
}
