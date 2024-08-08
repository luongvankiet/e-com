import React from 'react';
import { ConfirmDialog } from '@/components/custom-dialog';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { Iconify } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useBoolean } from '@/hooks/use-boolean';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { fCurrency } from '@/utils/format-number';
import { slice } from '@/utils/string';
import {
  Button,
  Checkbox,
  IconButton,
  LinearProgress,
  Link,
  ListItemText,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { route } from 'ziggy-js';
import Label from '@/components/label';
import ProductVariantQuickEditForm from './product-variant-quick-edit-form';

export default function ProductVariantDataTableRow({
  row,
  product,
  selected,
  onSelectRow,
  onEditRow,
  onDeleteRow,
}) {
  const { t } = useLocales();

  const {
    id,
    name,
    // image,
    regular_price,
    sale_price,
    quantity,
    options,
  } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {/* <Image
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
          /> */}

          <Link
            component={RouterLink}
            href={route(routes.dashboard.variants.edit, [product.id, id])}
            sx={{ color: 'text.secondary', typography: 'subtitle1' }}
          >
            {slice(name, 20)}
          </Link>
        </TableCell>

        <TableCell>
          {options.map((option, index) => (
            <Stack
              key={`${option.name}-${index}`}
              spacing={0.5}
              direction="row"
            >
              <Typography variant="body2">{option.name}:</Typography>
              <Label>{option.value}</Label>
            </Stack>
          ))}
        </TableCell>

        <TableCell>
          <LinearProgress
            value={(quantity || 0) < 100 ? quantity : 100}
            variant="determinate"
            color={(quantity <= 0 && 'error') || 'success'}
            sx={{ mb: 1, height: 6, maxWidth: 80 }}
          />
          {!!quantity && quantity}{' '}
          {t(
            (quantity <= 0 && 'Out of Stock') ||
              (quantity >= 1 && quantity <= 20 && 'Low stock') ||
              'In Stock'
          )}
        </TableCell>

        <TableCell>
          <ListItemText
            primary={
              sale_price ? fCurrency(sale_price) : fCurrency(regular_price)
            }
            secondary={!!sale_price && fCurrency(regular_price)}
            primaryTypographyProps={{ typography: 'body1' }}
            secondaryTypographyProps={{
              sx: { textDecoration: 'line-through' },
              component: 'span',
              color: 'text.disabled',
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

      <ProductVariantQuickEditForm
        row={row}
        product={product}
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

ProductVariantDataTableRow.propTypes = {
  row: PropTypes.object,
  product: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};
