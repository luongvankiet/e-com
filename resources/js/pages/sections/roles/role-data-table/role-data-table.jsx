import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocales } from '@/locales';
import { Table, useTable } from '@/components/table';
import { router } from '@inertiajs/react';
import { routes } from '@/routes';
import { route } from 'ziggy-js';
import { enqueueSnackbar } from 'notistack';
import { Card } from '@mui/material';
import RoleTableToolbar from './role-table-toolbar';
import RoleTableFiltersResult from './role-table-filters-result';
import RoleDataTableRow from './role-table-row';

const RoleDataTable = ({ roles = [], total = 0 }) => {
  const { t } = useLocales();

  const table = useTable();

  const columns = [
    { id: 'name', label: t('Role'), sortable: true },
    { id: 'description', label: t('Description'), width: 480 },
    { id: 'permissions', label: t('Permissions') },
    { id: 'updated_at', label: t('Modified'), sortable: true },
    { id: '', width: 88 },
  ];

  const handleDelete = useCallback(
    (ids) => {
      table.setIsLoading(true);

      router.post(
        route(routes.dashboard.settings.roles.deleteMany),
        { role_ids: ids || table.selected },
        {
          onStart: () => {},
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
    router.get(route(routes.dashboard.settings.roles.edit, id));
  }, []);

  return (
    <Card>
      <RoleTableToolbar filters={table.filters} onFilters={table.onFilters} />

      {table.canResetFilters && (
        <RoleTableFiltersResult
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
            roles.map((row) => row.id)
          )
        }
      >
        {roles.map((row) => (
          <RoleDataTableRow
            key={row.id}
            role={row}
            selected={table.selected.includes(row.id)}
            onSelectRow={() => table.onSelectRow(row.id)}
            onEditRow={() => handleEditRow(row.id)}
            onDeleteRow={() => handleDelete([row.id])}
          />
        ))}
      </Table>
    </Card>
  );
};

RoleDataTable.propTypes = {
  roles: PropTypes.array,
  total: PropTypes.number,
};

export default RoleDataTable;
