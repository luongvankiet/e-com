import { router, usePage } from '@inertiajs/react';
import { debounce, isEqual } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { route } from 'ziggy-js';

// ----------------------------------------------------------------------

export default function useTable({
  defaultFilters = { search: null },
  path = '',
  only = [],
}) {
  const { query } = usePage().props;

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(parseInt(query?.page) || 1);

  const [perPage, setPerPage] = useState(parseInt(query?.perPage) || 20);

  const [sort, setSort] = useState('');

  const [sortDirection, setSortDirection] = useState(
    query?.sortDirection || 'desc'
  );

  delete query.page;
  delete query.perPage;
  delete query.sort;
  delete query.sortDirection;

  const [selected, setSelected] = useState(defaultFilters?.selected || []);

  const hasQuery =
    typeof query === 'object' && !Array.isArray(query) && query !== null;

  const [filters, setFilters] = useState(hasQuery ? query : defaultFilters);

  const onFilters = useCallback((name, value) => {
    setPage(1);
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onRefresh = debounce((filters, page, perPage, sort, sortDirection) => {
    setSelected([]);

    router.visit(path || route(route().current()), {
      preserveState: true,
      preserveScroll: true,
      data: {
        ...filters,
        page,
        perPage,
        sort,
        sortDirection,
      },
      only: only,
      onFinish: () => {
        setIsLoading(false);
      },
    });
  }, 1000);

  useEffect(() => {
    setIsLoading(true);
    onRefresh(filters, page, perPage, sort, sortDirection);
  }, [filters, page, perPage, sort, sortDirection]);

  const canResetFilters = !isEqual(defaultFilters, filters);

  const onResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const onSort = useCallback(
    (id) => {
      const isAsc = sort === id && sortDirection === 'asc';
      if (id !== '') {
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSort(id);
      }
    },
    [sortDirection, sort]
  );

  const onSelectRow = useCallback(
    (inputValue) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onChangePerPage = useCallback((event) => {
    setPage(1);
    setPerPage(parseInt(event.target.value, 10));
  }, []);

  const onSelectAllRows = useCallback((checked, inputValue) => {
    if (checked) {
      setSelected(inputValue);
      return;
    }
    setSelected([]);
  }, []);

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage + 1);
  }, []);

  const onResetPage = useCallback(() => {
    setPage(1);
  }, []);

  const onUpdatePageDeleteRow = useCallback(
    (totalRowsInPage) => {
      setSelected([]);
      if (page) {
        if (totalRowsInPage < 2) {
          setPage(page - 1);
        }
      }
    },
    [page]
  );

  const onUpdatePageDeleteRows = useCallback(
    ({ totalRows, totalRowsInPage, totalRowsFiltered }) => {
      const totalSelected = selected.length;

      setSelected([]);

      if (page) {
        if (totalSelected === totalRowsInPage) {
          setPage(page - 1);
        } else if (totalSelected === totalRowsFiltered) {
          setPage(0);
        } else if (totalSelected > totalRowsInPage) {
          const newPage = Math.ceil((totalRows - totalSelected) / perPage) - 1;
          setPage(newPage);
        }
      }
    },
    [page, perPage, selected.length]
  );

  return {
    isLoading,
    filters,
    sortDirection,
    page,
    sort,
    perPage,
    canResetFilters,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onFilters,
    onResetFilters,
    onRefresh,
    onSort,
    onChangePage,
    onResetPage,
    onChangePerPage,
    onUpdatePageDeleteRow,
    onUpdatePageDeleteRows,
    //
    setIsLoading,
    setFilters,
    setPage,
    setSortDirection,
    setSort,
    setSelected,
    setPerPage,
  };
}
