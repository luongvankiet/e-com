<?php

namespace App\Http\QueryFilters;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

abstract class QueryFilter
{
    /** @var \Illuminate\Contracts\Foundation\Application */
    protected $app;

    /** @var \Illuminate\Http\Request */
    protected $request;

    /** @var \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder */
    protected $queryBuilder;

    /** @var array */
    protected $ignore = [];

    /** @var string */
    protected $sortDirection = 'desc';

    /** @var string */
    protected $sortBy;

    /** @var string */
    protected $defaultSortBy = 'updated_at';

    /** @var array */
    protected $sortable = [
        'created_at',
    ];

    /** @var array */
    protected $searchable = [];

    /** @var bool */
    protected $disabledPagination = false;

    /** @var array */
    protected $allowsPerPage = [
        5, 10, 20, 50, 100, 150, 200,
    ];

    /** @var int */
    protected $perPage = 20;

    /** @var \Closure|callable */
    protected $bootingCallback;

    public function __construct(Application $application, Request $request, $query)
    {
        $this->app = $application;
        $this->request = $request;
        $this->queryBuilder = $query;
    }

    public static function make($query, $booting = null)
    {
        /** @var static $instance */
        $instance = resolve(static::class, ['query' => $query]);

        $instance->setBootingCallback($booting);

        $instance->handle();

        return $instance->getResult();
    }

    public function setBootingCallback($booting)
    {
        $this->bootingCallback = $booting;

        return $this;
    }

    public function getQuery()
    {
        return $this->queryBuilder;
    }

    public function indexQuery()
    {
        //
    }

    public function beforeHandle()
    {
        //
    }

    public function afterHandle()
    {
        //
    }

    public function handle()
    {
        $this->indexQuery();

        $this->beforeHandle();

        foreach ($this->request->query() as $key => $value) {
            $filterName = Str::camel(is_numeric($key) ? $value : $key);
            $filterValue = is_numeric($key) ? null : $value;

            if (!$this->shouldIgnore($filterName) && method_exists($this, $filterName)) {
                $this->app->call([$this, $filterName], ['value' => $filterValue]);
            }
        }

        $this->afterHandle();

        if ($this->bootingCallback instanceof \Closure || is_callable($this->bootingCallback)) {
            call_user_func($this->bootingCallback, $this);
        }
    }

    protected function shouldIgnore(string $filterName): bool
    {
        return in_array($filterName, $this->ignoredFilters());
    }

    protected function ignoredFilters(): array
    {
        return array_merge([
            'beforeHandle',
            'afterHandle',
            'handle',
            'shouldIgnore',
            'ignoreFilters',
        ], $this->ignore);
    }

    public function getResult()
    {
        $this->queryBuilder->orderBy($this->sortBy ?: $this->defaultSortBy, $this->sortDirection);

        return $this->disabledPagination
            ? $this->queryBuilder->get()
            : $this->queryBuilder->paginate($this->perPage);
    }

    public function sort($value)
    {
        $this->sortBy = in_array($value, $this->sortable) ? $value : $this->defaultSortBy;
    }

    public function sortDirection($value)
    {
        $this->sortDirection = ($value === 'desc') ? 'desc' : 'asc';
    }

    public function search($value)
    {
        if (!$this->searchable && $value) {
            $this->queryBuilder->whereRaw('1=2');
        }

        $this->queryBuilder->where(function ($query) use ($value) {
            foreach ($this->searchable as $column) {
                $columnName = Str::contains($column, '.')
                    ? $column
                    : $this->queryBuilder->qualifyColumn($column);

                $query->orWhere($columnName, 'like', "%{$value}%");
            }
        });
    }

    public function disabledPagination()
    {
        $this->disabledPagination = true;
    }

    public function enabledPagination()
    {
        $this->disabledPagination = false;
    }

    public function perPage($value)
    {
        if (in_array((int) $value, $this->allowsPerPage)) {
            $this->perPage = (int) $value;
        }
    }

    public function skip($value)
    {
        $this->offset($value);
    }

    public function offset($value)
    {
        if (!$this->disabledPagination) {
            return;
        }

        $this->queryBuilder->skip($value);
    }

    public function take($value)
    {
        $this->limit($value);
    }

    public function limit($value)
    {
        if (!$this->disabledPagination) {
            return;
        }

        $this->queryBuilder->limit($value);
    }
}
