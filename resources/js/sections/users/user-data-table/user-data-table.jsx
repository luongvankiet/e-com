import { Iconify } from '@/components/icons';
import Label from '@/components/label';
import Scrollbar from '@/components/scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  useTable,
} from '@/components/table';
import { useBoolean } from '@/hooks/use-boolean';
import debounce from 'lodash/debounce';

import { routes } from '@/routes';
import { router, usePage } from '@inertiajs/react';

import {
  Card,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import UserTableFiltersResult from './user-table-filters-result';
import UserDataTableRow from './user-table-row';
import UserTableToolbar from './user-table-toolbar';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'verified', label: 'Verified' },
  { value: 'trashed', label: 'Trashed' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'phone_number', label: 'Phone Number' },
  { id: 'role', label: 'Role' },
  { id: 'verified', label: 'Verified' },
  { id: 'modified', label: 'Modified' },
  { id: '', width: 88 },
];

const UserDataTable = ({
  users = [],
  roles = [],
  usersCount = 0,
  totalCount = 0,
  verifiedCount = 0,
  pendingCount = 0,
  trashedCount = 0,
}) => {
  const table = useTable();

  const confirm = useBoolean();
  const confirmRestore = useBoolean();

  const { query } = usePage().props;

  const hasQuery =
    typeof query === 'object' && !Array.isArray(query) && query !== null;

  const defaultFilters = {
    search: null,
    roles: 'all',
    status: 'all',
    page: 1,
    perPage: 20,
  };

  const [filters, setFilters] = useState(
    hasQuery
      ? {
          ...query,
          page: parseInt(query.page || 1),
          perPage: parseInt(query.perPage || 20),
        }
      : defaultFilters
  );

  const refreshList = debounce((filters) => {
    router.visit(route(route().current()), {
      preserveState: true,
      preserveScroll: true,
      replace: true,
      data: { ...filters },
      only: ['users', 'users_count'],
    });
  }, 1000);

  useEffect(() => {
    refreshList(filters);
  }, [filters]);

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDelete = useCallback(
    async (ids) => {
      //   try {
      //     if (debouncedFilters.status === 'trashed') {
      //       await UserService.permanentDeleteMany(ids);
      //     } else {
      //       await UserService.deleteMany(ids);
      //     }
      //     enqueueSnackbar('Delete Successfully!', { variant: 'success' });
      //     table.setSelected([]);
      //     if (confirm) {
      //       confirm.onFalse();
      //     }
      //   } catch (error) {
      //     enqueueSnackbar('Failed to delete!', { variant: 'error' });
      //     console.error(error);
      //   }
      // },
    },
    [table]
  );

  const handleRestore = useCallback(
    async (ids) => {
      // try {
      //   await UserService.restoreMany(ids);
      //   refreshList.onToggle();
      //   enqueueSnackbar('Restore Successfully!', { variant: 'success' });
      //   table.setSelected([]);
      //   if (confirmRestore) {
      //     confirmRestore.onFalse();
      //   }
      // } catch (error) {
      //   enqueueSnackbar('Failed to restore!', { variant: 'error' });
      //   console.error(error);
      // }
    },
    [table]
  );

  const handleEditRow = useCallback((id) => {
    route(routes.dashboard.settings.users.edit, id);
  }, []);

  return (
    <Card>
      <Tabs
        value={filters.status}
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
                  ((tab.value === 'all' || tab.value === filters.status) &&
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
                {tab.value === 'all' && totalCount}
                {tab.value === 'verified' && verifiedCount}
                {tab.value === 'pending' && pendingCount}
                {tab.value === 'trashed' && trashedCount}
              </Label>
            }
          />
        ))}
      </Tabs>

      <UserTableToolbar
        filters={filters}
        onFilters={handleFilters}
        //
        roleOptions={roles}
      />

      {canReset && (
        <UserTableFiltersResult
          filters={filters}
          onFilters={handleFilters}
          //
          onResetFilters={handleResetFilters}
          //
          results={usersCount}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={usersCount}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              users.map((row) => row.id)
            )
          }
          action={
            <>
              {filters.status === 'trashed' && (
                <Tooltip title="Restore">
                  <IconButton color="primary" onClick={confirmRestore.onTrue}>
                    <Iconify icon="material-symbols:settings-backup-restore-rounded" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip
                title={
                  filters.status === 'trashed' ? 'Permanent Delete' : 'Delete'
                }
              >
                <IconButton color="error" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </>
          }
        />

        <Scrollbar sx={{ maxHeight: { lg: '600px', xl: '800px' } }}>
          <Table size={table.dense ? 'small' : 'medium'} stickyHeader>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={usersCount}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  users.map((row) => row.id)
                )
              }
            />
            <TableBody>
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
              {!usersCount && <TableNoData notFound={!usersCount} />}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );

  // return <></>;
};

UserDataTable.propTypes = {
  users: PropTypes.array,
  roles: PropTypes.array,
  usersCount: PropTypes.number,
  totalCount: PropTypes.number,
  verifiedCount: PropTypes.number,
  pendingCount: PropTypes.number,
  trashedCount: PropTypes.number,
};

export default UserDataTable;
