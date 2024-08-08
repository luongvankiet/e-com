import { router, usePage } from '@inertiajs/react';
import { debounce, isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

// ----------------------------------------------------------------------

export function useFilters(defaultFilters = { search: null }) {
  const { query } = usePage().props;

  const hasQuery =
    typeof query === 'object' && !Array.isArray(query) && query !== null;

  const [filters, setFilters] = useState(
    hasQuery
      ? {
          ...query,
          page: parseInt(query.page || 1),
          perPage: parseInt(query.perPage || 20),
        }
      : defaultFilters
  );

  const onFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onRefresh = debounce((filters) => {
    router.visit(route(route().current()), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      data: { ...filters },
    });
  }, 1000);

  useEffect(() => {
    onRefresh(filters);
  }, [filters]);

  const canResetFilters = !isEqual(defaultFilters, filters);

  const onResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    filters,
    setFilters,
    onFilters,
    onRefresh,
    onResetFilters,
    canResetFilters,
  };
}
