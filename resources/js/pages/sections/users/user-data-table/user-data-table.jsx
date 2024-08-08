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
import UserTableFiltersResult from './user-table-filters-result';
import UserDataTableRow from './user-table-row';
import UserTableToolbar from './user-table-toolbar';
import { router } from '@inertiajs/react';
import { enqueueSnackbar } from 'notistack';

const UserDataTable = ({
  users = [],
  roles = [],
  total = 0,
  allCount = 0,
  verifiedCount = 0,
  pendingCount = 0,
  trashedCount = 0,
}) => {
  const { t } = useLocales();

  const table = useTable({
    defaultFilters: {
      search: null,
      roles: 'all',
      status: 'all',
    },
  });

  const columns = [
    { id: 'first_name', label: t('Account'), sortable: true },
    { id: 'phone', label: t('Phone Number') },
    { id: 'role', label: t('Role') },
    { id: 'verified', label: t('Verified') },
    { id: 'updated_at', label: t('Modified'), sortable: true },
    { id: '', width: 88 },
  ];

  const STATUS_OPTIONS = [
    { value: 'all', label: t('All') },
    { value: 'pending', label: t('Pending') },
    { value: 'verified', label: t('Verified') },
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
        route(routes.dashboard.settings.users.deleteMany),
        { user_ids: ids || table.selected },
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
        route(routes.dashboard.settings.users.restoreMany),
        { user_ids: ids || table.selected },
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
    router.get(route(routes.dashboard.settings.users.edit, id));
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
                  (tab.value === 'verified' && 'success') ||
                  (tab.value === 'pending' && 'warning') ||
                  (tab.value === 'trashed' && 'error') ||
                  'default'
                }
              >
                {tab.value === 'all' && allCount}
                {tab.value === 'verified' && verifiedCount}
                {tab.value === 'pending' && pendingCount}
                {tab.value === 'trashed' && trashedCount}
              </Label>
            }
          />
        ))}
      </Tabs>

      <UserTableToolbar
        filters={table.filters}
        onFilters={table.onFilters}
        //
        roleOptions={roles}
      />

      {table.canResetFilters && (
        <UserTableFiltersResult
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
            users.map((row) => row.id)
          )
        }
      >
        {users.map((row) => (
          <UserDataTableRow
            key={row.id}
            user={row}
            roles={roles}
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

UserDataTable.propTypes = {
  users: PropTypes.array,
  roles: PropTypes.array,
  total: PropTypes.number,
  allCount: PropTypes.number,
  verifiedCount: PropTypes.number,
  pendingCount: PropTypes.number,
  trashedCount: PropTypes.number,
};

export default UserDataTable;
