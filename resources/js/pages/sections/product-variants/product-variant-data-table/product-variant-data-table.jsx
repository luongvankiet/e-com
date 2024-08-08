import React from 'react';
import { Table, useTable } from '@/components/table';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { router } from '@inertiajs/react';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { route } from 'ziggy-js';
import ProductVariantDataTableRow from './product-variant-data-table-row';
import ProductVariantTableFiltersResult from './product-variant-table-filters-result';
import ProductVariantTableToolbar from './product-variant-table-toolbar';

const ProductVariantDataTable = ({ product, variants = [], total = 0 }) => {
  const { t } = useLocales();

  const table = useTable({
    defaultFilters: { search: null },
    path: route(route().current(), [product.id]),
    only: ['variants', 'variants_count'],
  });

  const columns = [
    { id: 'variant', label: t('Variant'), width: 100 },
    { id: 'option', label: t('Options'), width: 120 },
    { id: 'quantity', label: t('Stock'), width: 160 },
    { id: 'regular_price', label: t('Price'), width: 60 },
    { id: '', width: 88 },
  ];

  const handleDelete = useCallback(
    (ids) => {
      if (!product) {
        return;
      }

      router.post(
        route(routes.dashboard.variants.deleteMany, [product.id]),
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

  const handleEditRow = useCallback((id) => {
    router.get(route(routes.dashboard.variants.edit, id));
  }, []);

  return (
    <>
      <ProductVariantTableToolbar
        filters={table.filters}
        onFilters={table.onFilters}
      />

      {table.canResetFilters && (
        <ProductVariantTableFiltersResult
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
        onSelectAllRows={(checked) =>
          table.onSelectAllRows(
            checked,
            variants.map((row) => row.id)
          )
        }
      >
        {variants.map((row) => (
          <ProductVariantDataTableRow
            key={row.id}
            row={row}
            product={product}
            selected={table.selected.includes(row.id)}
            onSelectRow={() => table.onSelectRow(row.id)}
            onEditRow={() => handleEditRow(row.id)}
            onDeleteRow={() => handleDelete([row.id])}
          />
        ))}
      </Table>
    </>
  );
};

ProductVariantDataTable.propTypes = {
  product: PropTypes.object,
  variants: PropTypes.array,
  total: PropTypes.number,
};

export default ProductVariantDataTable;
