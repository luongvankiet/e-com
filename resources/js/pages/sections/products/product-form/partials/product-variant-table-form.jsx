import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
} from '@/components/table';
import {
  Button,
  Checkbox,
  IconButton,
  LinearProgress,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import Scrollbar from '@/components/scrollbar';
import { Iconify } from '@/components/icons';
import { useLocales } from '@/locales';
import { fCurrency } from '@/utils/format-number';
import { useBoolean } from '@/hooks/use-boolean';
import { ConfirmDialog } from '@/components/custom-dialog';
import ProductVariantQuickEditForm from './product-variant-quick-edit-form';
import uuidv4 from '@/utils/uuidv4';
import Label from '@/components/label';

const ProductVariantTableForm = ({ product, data, setData }) => {
  const { t } = useLocales();

  const { variants = [] } = data;

  const columns = [
    { id: 'variant', label: t('Variant'), width: 100 },
    { id: 'option', label: t('Options'), width: 120 },
    { id: 'quantity', label: t('Stock'), width: 160 },
    { id: 'regular_price', label: t('Price'), width: 60 },
    { id: '', width: 88 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const onSelectRow = useCallback(
    (inputValue) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      console.warn(newSelected);
      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback((checked, inputValue) => {
    if (checked) {
      setSelected(inputValue);
      return;
    }
    setSelected([]);
  }, []);

  const onChangeRowsPerPage = useCallback((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleDelete = useCallback(
    (ids) => {
      setData(
        'variants',
        variants.filter((variant) => !ids.includes(variant.id))
      );

      setSelected([]);
    },
    [variants]
  );

  const updateVariant = useCallback(
    (variant) => {
      setData(
        'variants',
        variants.map((prevVariant) =>
          prevVariant.id === variant.id
            ? {
                ...prevVariant,
                ...variant,
              }
            : prevVariant
        )
      );
    },
    [variants]
  );

  const generateVariants = (optionsData) => {
    const options = optionsData.filter((option) => {
      return !!option.name && !!option.values?.length;
    });

    const combine = (acc, optionIndex = 0) => {
      const option = options[optionIndex];

      if (optionIndex === options.length - 1) {
        return option?.values.map((valueObj) => ({
          id: uuidv4(),
          product_id: product?.id,
          name: acc
            .map((a) => a.value)
            .concat(valueObj.value)
            .join(' / '),
          quantity: data?.quantity,
          regular_price: data.regular_price,
          sale_price: data.sale_price,
          options: [...acc, { name: option.name, value: valueObj.value }],
        }));
      }

      const combinations = option?.values.flatMap((valueObj) =>
        combine(
          [...acc, { name: option.name, value: valueObj.value }],
          optionIndex + 1
        )
      );

      return combinations;
    };

    return combine([]);
  };

  useEffect(() => {
    if (!data.options?.length) {
      return;
    }

    const variants = generateVariants(data.options || []);

    setData('variants', variants);
  }, [data.options, data.quantity, data.regular_price, data.sale_price]);

  return (
    <>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          numSelected={selected.length}
          rowCount={variants.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              variants.map((row) => row.id)
            )
          }
          action={
            <Tooltip title="Delete" onClick={() => handleDelete(selected)}>
              <IconButton color="primary">
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
        />

        <Scrollbar>
          <Table stickyHeader>
            <TableHeadCustom
              headLabel={columns}
              rowCount={variants.length}
              numSelected={selected.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  variants.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {variants
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <ProductVariantTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => onSelectRow(row.id)}
                    onDeleteRow={() => handleDelete([row.id])}
                    onUpdateVariant={updateVariant}
                  />
                ))}

              <TableNoData notFound={!variants.length} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={variants.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </>
  );
};

ProductVariantTableForm.propTypes = {
  product: PropTypes.object,
  data: PropTypes.object,
  setData: PropTypes.func,
};

export default ProductVariantTableForm;

const ProductVariantTableRow = ({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onUpdateVariant,
}) => {
  const { t } = useLocales();

  const { id, name, regular_price, sale_price, quantity, options } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            id={`select-${id}`}
            checked={selected}
            onClick={onSelectRow}
          />
        </TableCell>

        <TableCell>{name}</TableCell>

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
              (quantity >= 1 && quantity <= 4 && 'Low stock') ||
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
            <IconButton color="error" onClick={confirm.onTrue}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ProductVariantQuickEditForm
        row={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        onDeleteRow={onDeleteRow}
        onUpdateVariant={onUpdateVariant}
      />

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
};

ProductVariantTableRow.propTypes = {
  row: PropTypes.object,
  product: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onRestoreRow: PropTypes.func,
  onUpdateVariant: PropTypes.func,
};
