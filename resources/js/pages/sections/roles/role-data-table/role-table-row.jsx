import React from 'react';
import PropTypes from 'prop-types';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { useBoolean } from '@/hooks/use-boolean';
import { ConfirmDialog } from '@/components/custom-dialog';
import {
  TableRow,
  TableCell,
  Checkbox,
  Button,
  ListItemText,
  Link,
  Tooltip,
  IconButton,
  MenuItem,
} from '@mui/material';
import { format } from 'date-fns';
import Label from '@/components/label';
import RouterLink from '@/components/router-link';
import { Iconify } from '@/components/icons';
import { route } from 'ziggy-js';
import { routes } from '@/routes';
import { useLocales } from '@/locales';
import RoleQuickEditForm from './role-quick-edit-form';
import { slice } from '@/utils/string';

export default function RoleDataTableRow({
  role,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
}) {
  const { t, currentLang } = useLocales();

  const { id, name, description, display_name, permissions_count, updated_at } =
    role;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            primary={
              <Link
                component={RouterLink}
                href={route(routes.dashboard.settings.roles.edit, id)}
                sx={{ color: 'text.secondary' }}
              >
                {slice(display_name, 40)}
              </Link>
            }
            secondary={slice(`ID: ${name}`, 40)}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell>{description}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label>
            {(name === 'super_admin' && 'Full control') || permissions_count}
          </Label>
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
        </TableCell>
      </TableRow>

      <RoleQuickEditForm
        role={role}
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
    </>
  );
}

RoleDataTableRow.propTypes = {
  role: PropTypes.object,
  selected: PropTypes.any,
  onSelectRow: PropTypes.any,
  onEditRow: PropTypes.any,
  onDeleteRow: PropTypes.any,
};
