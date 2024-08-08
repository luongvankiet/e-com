import React from 'react';
import { ConfirmDialog } from '@/components/custom-dialog';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { Iconify } from '@/components/icons';
import Image from '@/components/image';
import Label from '@/components/label';
import RouterLink from '@/components/router-link';
import { TextMaxLine } from '@/components/text-max-line';
import { useBoolean } from '@/hooks/use-boolean';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { slice } from '@/utils/string';
import {
  Button,
  Checkbox,
  IconButton,
  Link,
  ListItemText,
  MenuItem,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { route } from 'ziggy-js';
import BrandQuickEditForm from './brand-quick-edit-form';
import { router } from '@inertiajs/react';

export default function BrandDataTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
  onRestoreRow,
}) {
  const { t, currentLang } = useLocales();

  const { id, name, description, image, deleted_at, published_at, updated_at } =
    row;

  const handlePublish = (event) => {
    router.put(route(routes.dashboard.brands.update, id), {
      ...row,
      published_at: event.target.checked ? new Date() : null,
    });
  };

  const confirm = useBoolean();

  const confirmRestore = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell
          sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}
        >
          <Image
            alt={image?.alt_text}
            src={image?.url}
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              mr: 2,
            }}
            variant="rounded"
            ratio="1/1"
          />

          <Link
            component={RouterLink}
            href={route(routes.dashboard.brands.edit, id)}
            sx={{ color: 'text.secondary', typography: 'subtitle1' }}
          >
            {slice(name, 20)}
          </Link>
        </TableCell>

        <TableCell>
          <TextMaxLine>{description || '--'}</TextMaxLine>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {(deleted_at && (
            <Label variant="soft" color="warning">
              Trashed
            </Label>
          )) || <Switch checked={!!published_at} onChange={handlePublish} />}
        </TableCell>

        <TableCell>
          <ListItemText
            primary={t(
              format(new Date(updated_at), 'dd MMM, yyyy', {
                locale: currentLang.adapterLocale,
              })
            )}
            secondary={format(new Date(updated_at), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {!deleted_at ? (
            <>
              <Tooltip title={t('Quick Edit')} placement="top" arrow>
                <IconButton
                  color={quickEdit.value ? 'inherit' : 'default'}
                  onClick={quickEdit.onTrue}
                >
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t('More')} placement="top" arrow>
                <IconButton
                  color={popover.open ? 'inherit' : 'default'}
                  onClick={popover.onOpen}
                >
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title={t('Restore')} placement="top" arrow>
                <IconButton color="default" onClick={confirmRestore.onTrue}>
                  <Iconify icon="material-symbols:settings-backup-restore-rounded" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t('Permanent Delete')} placement="top" arrow>
                <IconButton color="error" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </TableCell>
      </TableRow>

      <BrandQuickEditForm
        brand={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        onDeleteRow={onDeleteRow}
      />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {t('Edit')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t('Delete')}
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('Delete')}
        content={t('Are you sure want to delete selected items?')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('Delete')}
          </Button>
        }
      />
      <ConfirmDialog
        open={confirmRestore.value}
        onClose={confirmRestore.onFalse}
        title={t('Restore')}
        content={t('Are you sure want to restore selected items?')}
        action={
          <Button variant="contained" color="success" onClick={onRestoreRow}>
            {t('Restore')}
          </Button>
        }
      />
    </>
  );
}

BrandDataTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onRestoreRow: PropTypes.func,
};
