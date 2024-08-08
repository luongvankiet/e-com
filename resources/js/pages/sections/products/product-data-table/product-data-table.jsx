import React from 'react';
import Label from '@/components/label';
import { Table, useTable } from '@/components/table';

import { routes } from '@/routes';

import { useLocales } from '@/locales';
import { Card, Tab, Tabs } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useCallback } from 'react';
import { route } from 'ziggy-js';
import { router, usePage } from '@inertiajs/react';
import { enqueueSnackbar } from 'notistack';
import ProductTableToolbar from './product-table-toolbar';
import ProductTableFiltersResult from './product-table-filters-result';
import ProductDataTableRow from './product-table-row';

export default function ProductDataTable() {
  const {
    products,
    total,
    all_count,
    draft_count,
    published_count,
    trashed_count,
  } = usePage().props;

  const { t } = useLocales();

  const table = useTable({
    defaultFilters: {
      search: null,
      status: 'all',
      stock: 'all',
    },
  });

  const columns = [
    { id: 'name', label: t('Product'), width: 200, sortable: true },
    { id: 'quantity', label: t('Stock'), width: 200, sortable: true },
    { id: 'regular_price', label: t('Price'), width: 140, sortable: true },
    { id: 'status', label: t('Status'), width: 110, sortable: true },
    { id: 'publish', label: t('Publish') },
    { id: 'created_at', label: t('Created At'), sortable: true },
    { id: '', width: 88 },
  ];

  const STATUS_OPTIONS = [
    { value: 'all', label: t('All') },
    { value: 'published', label: t('Published') },
    { value: 'draft', label: t('Draft') },
    { value: 'trashed', label: t('Deleted') },
  ];

  const STOCK_OPTIONS = [
    { value: 'all', label: t('All') },
    { value: 'in_stock', label: t('In stock') },
    { value: 'low_stock', label: t('Low stock') },
    { value: 'out_of_stock', label: t('Out of stock') },
  ];

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onFilters('status', newValue);
    },
    [table.onFilters]
  );

  const handleDelete = useCallback(
    (ids) => {
      router.post(
        route(routes.dashboard.products.deleteMany),
        { ids: ids || table.selected },
        {
          preserveScroll: true,
          onStart: () => {
            table.setIsLoading(true);
          },
          onSuccess: () => {
            enqueueSnackbar(t('Deleted successfully!'), { variant: 'success' });
            table.setSelected([]);
          },
          onError: (error) => {
            enqueueSnackbar(t(error?.message || t('Failed to delete!')), {
              variant: 'error',
            });
          },
          onFinish: () => {
            table.setIsLoading(false);
          },
        }
      );
    },
    [table]
  );

  const handleRestore = useCallback(
    async (ids) => {
      router.post(
        route(routes.dashboard.products.restoreMany),
        { ids: ids || table.selected },
        {
          preserveScroll: true,
          onStart: () => {
            table.setIsLoading(true);
          },
          onSuccess: () => {
            enqueueSnackbar(t('Restored successfully!'), {
              variant: 'success',
            });
            table.setSelected([]);
          },
          onError: (error) => {
            enqueueSnackbar(t(error?.message || t('Failed to restore!')), {
              variant: 'error',
            });
          },
          onFinish: () => {
            table.setIsLoading(false);
          },
        }
      );
    },
    [table]
  );

  const handleEditRow = useCallback((id) => {
    router.get(route(routes.dashboard.products.edit, id));
  }, []);

  return (
    <Card>
      <Tabs
        value={table.filters.status}
        onChange={handleFilterStatus}
        sx={{
          px: 2.5,
          boxShadow: (theme) =>
            `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={tab.label}
            icon={
              <Label
                variant={
                  ((tab.value === 'all' ||
                    tab.value === table.filters.status) &&
                    'filled') ||
                  'soft'
                }
                color={
                  (tab.value === 'published' && 'success') ||
                  (tab.value === 'draft' && 'warning') ||
                  (tab.value === 'trashed' && 'error') ||
                  'default'
                }
              >
                {tab.value === 'all' && all_count}
                {tab.value === 'published' && published_count}
                {tab.value === 'draft' && draft_count}
                {tab.value === 'trashed' && trashed_count}
              </Label>
            }
          />
        ))}
      </Tabs>

      <ProductTableToolbar
        filters={table.filters}
        onFilters={table.onFilters}
        stockOptions={STOCK_OPTIONS}
      />

      {table.canResetFilters && (
        <ProductTableFiltersResult
          filters={table.filters}
          onFilters={table.onFilters}
          //
          onResetFilters={table.onResetFilters}
          //
          results={total}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Table
        table={table}
        columns={columns}
        count={total}
        onDelete={handleDelete}
        onRestore={handleRestore}
        onSelectAllRows={(checked) =>
          table.onSelectAllRows(
            checked,
            products.map((row) => row.id)
          )
        }
      >
        {products.map((row) => (
          <ProductDataTableRow
            key={row.id}
            row={row}
            selected={table.selected.includes(row.id)}
            onSelectRow={() => table.onSelectRow(row.id)}
            onEditRow={() => handleEditRow(row.id)}
            onDeleteRow={() => handleDelete([row.id])}
            onRestoreRow={() => handleRestore([row.id])}
          />
        ))}
      </Table>
    </Card>
  );
}
