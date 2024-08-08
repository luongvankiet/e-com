import React from 'react';
import Label from '@/components/label';
import { Table, useTable } from '@/components/table';

import { routes } from '@/routes';

import { useLocales } from '@/locales';
import { Card, Tab, Tabs } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { route } from 'ziggy-js';
import BrandDataTableRow from './brand-table-row';
import { router } from '@inertiajs/react';
import { enqueueSnackbar } from 'notistack';
import BrandTableToolbar from './brand-table-toolbar';
import BrandTableFiltersResult from './brand-table-filters-result';

const BrandDataTable = ({
  brands = [],
  total = 0,
  allCount = 0,
  draftCount = 0,
  publishedCount = 0,
  trashedCount = 0,
}) => {
  const { t } = useLocales();

  const table = useTable({
    defaultFilters: {
      search: null,
      status: 'all',
    },
  });

  const columns = [
    { id: 'name', label: t('Name'), width: 200, sortable: true },
    { id: 'description', label: t('Description'), width: 450 },
    { id: 'publish', label: t('Publish') },
    { id: 'updated_at', label: t('Modified'), sortable: true },
    { id: '', width: 88 },
  ];

  const STATUS_OPTIONS = [
    { value: 'all', label: t('All') },
    { value: 'published', label: t('Published') },
    { value: 'draft', label: t('Draft') },
    { value: 'trashed', label: t('Deleted') },
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
        route(routes.dashboard.brands.deleteMany),
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
        route(routes.dashboard.brands.restoreMany),
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
    router.get(route(routes.dashboard.brands.edit, id));
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
                {tab.value === 'all' && allCount}
                {tab.value === 'published' && publishedCount}
                {tab.value === 'draft' && draftCount}
                {tab.value === 'trashed' && trashedCount}
              </Label>
            }
          />
        ))}
      </Tabs>

      <BrandTableToolbar filters={table.filters} onFilters={table.onFilters} />

      {table.canResetFilters && (
        <BrandTableFiltersResult
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
            brands.map((row) => row.id)
          )
        }
      >
        {brands.map((row) => (
          <BrandDataTableRow
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
};

BrandDataTable.propTypes = {
  brands: PropTypes.array,
  total: PropTypes.number,
  allCount: PropTypes.number,
  draftCount: PropTypes.number,
  publishedCount: PropTypes.number,
  trashedCount: PropTypes.number,
};

export default BrandDataTable;
