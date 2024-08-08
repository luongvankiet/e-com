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
  Avatar,
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
import UserQuickEditForm from './user-quick-edit-form';
import { route } from 'ziggy-js';
import { routes } from '@/routes';
import { useLocales } from '@/locales';
import { useAppContext } from '@/contexts/app/app-context';
import { slice } from '@/utils/string';

export default function UserDataTableRow({
  user,
  roles,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
  onRestoreRow,
}) {
  const { t, currentLang } = useLocales();

  const { hasPermissions } = useAppContext();

  const {
    id,
    full_name,
    email,
    phone,
    role,
    image,
    email_verified_at,
    updated_at,
    deleted_at,
  } = user;

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
          <Avatar alt={image?.alt_text} sx={{ mr: 2 }} src={image?.url} />

          <ListItemText
            primary={
              <Link
                component={RouterLink}
                href={route(routes.dashboard.settings.users.edit, id)}
                sx={{ color: 'text.secondary' }}
              >
                {slice(full_name, 40)}
              </Link>
            }
            secondary={email}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {role && hasPermissions('roles.view') ? (
            <Link
              component={RouterLink}
              href={route(routes.dashboard.settings.roles.edit, role.id)}
            >
              {role.display_name || '--'}
            </Link>
          ) : (
            role?.display_name || '--'
          )}
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={(!!email_verified_at && 'success') || 'default'}
          >
            {t(email_verified_at ? 'Verified' : 'Pending')}
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

      <UserQuickEditForm
        user={user}
        roles={roles}
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

UserDataTableRow.propTypes = {
  user: PropTypes.any,
  roles: PropTypes.any,
  selected: PropTypes.any,
  onSelectRow: PropTypes.any,
  onEditRow: PropTypes.any,
  onDeleteRow: PropTypes.any,
  onRestoreRow: PropTypes.any,
};
