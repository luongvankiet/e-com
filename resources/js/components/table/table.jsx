import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableBody,
  TableContainer,
  Tooltip,
  Table as MUITable,
  Button,
} from '@mui/material';
import TableSelectedAction from './table-selected-action';
import TablePaginationCustom from './table-pagination-custom';
import TableNoData from './table-no-data';
import { Iconify } from '../icons';
import Scrollbar from '../scrollbar';
import TableHeadCustom from './table-head-custom';
import { ConfirmDialog } from '../custom-dialog';
import { useBoolean } from '@/hooks/use-boolean';
import { useLocales } from '@/locales';
import TableSkeleton from './table-skeleton';

export default function Table({
  children,
  table,
  count = 0,
  action,
  columns = [],
  onSelectAllRows,
  onDelete,
  onRestore,
}) {
  const { t } = useLocales();
  const confirm = useBoolean();
  const confirmRestore = useBoolean();

  return (
    <>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          numSelected={table.selected.length}
          rowCount={count}
          onSelectAllRows={onSelectAllRows}
          action={
            action || (
              <>
                {onRestore && table.filters.status === 'trashed' && (
                  <Tooltip title="Restore">
                    <IconButton color="primary" onClick={confirmRestore.onTrue}>
                      <Iconify icon="material-symbols:settings-backup-restore-rounded" />
                    </IconButton>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip
                    title={
                      table.filters.status === 'trashed'
                        ? 'Permanent Delete'
                        : 'Delete'
                    }
                  >
                    <IconButton color="error" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )
          }
        />

        <Scrollbar sx={{ maxHeight: { lg: '600px', xl: '800px' } }}>
          <MUITable stickyHeader>
            <TableHeadCustom
              sort={table.sort}
              sortDirection={table.sortDirection}
              headLabel={columns}
              rowCount={count}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={onSelectAllRows}
            />
            <TableBody>
              {table.isLoading ? (
                [...Array(5)].map((i, index) => <TableSkeleton key={index} />)
              ) : (
                <>
                  {children}
                  {!count && <TableNoData notFound={!count} />}
                </>
              )}
            </TableBody>
          </MUITable>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={count}
        page={table.page - 1}
        rowsPerPage={table.perPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangePerPage}
      />

      {onDelete && (
        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Delete"
          content={t('Are you sure want to delete selected items?')}
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onDelete();
                confirm.onFalse();
              }}
            >
              {t('Delete')}
            </Button>
          }
        />
      )}

      {onRestore && (
        <ConfirmDialog
          open={confirmRestore.value}
          onClose={confirmRestore.onFalse}
          title="Delete"
          content={t('Are you sure want to restore selected items?')}
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onRestore();
                confirmRestore.onFalse();
              }}
            >
              {t('Restore')}
            </Button>
          }
        />
      )}
    </>
  );
}

Table.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.array,
  table: PropTypes.object.isRequired,
  count: PropTypes.number,
  action: PropTypes.node,
  onSelectAllRows: PropTypes.func,
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
};
