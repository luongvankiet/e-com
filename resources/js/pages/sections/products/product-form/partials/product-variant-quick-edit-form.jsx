import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocales } from '@/locales';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CustomDialog } from '@/components/custom-dialog';

const ProductVariantQuickEditForm = ({
  row,
  open,
  onClose,
  onDeleteRow,
  onUpdateVariant,
}) => {
  const { t } = useLocales();
  const [variant, setVariant] = useState(row);
  const [hasErrors, setHasErrors] = useState(false);
  const [errors, setErrors] = useState({ name: '', options: [] });

  const handleChangeName = useCallback(
    (e) => {
      const value = e.target.value;

      if (!value) {
        setErrors({ ...errors, name: t('The title field is required!') });
      }

      setVariant({ ...variant, name: value });
    },
    [variant]
  );

  const handleChangeOption = useCallback(
    (index) => (e) => {
      const value = e.target.value;

      if (!value) {
        setErrors({
          ...errors,
          options: !errors?.options?.some((error) => error === index)
            ? [...errors.options, index]
            : errors?.options,
        });
      } else {
        setErrors({
          ...errors,
          options: errors?.options?.filter((error) => error !== index) || [
            index,
          ],
        });
      }

      const options = variant.options.map((valueOption, valueOptionIndex) =>
        valueOptionIndex === index
          ? { ...valueOption, value: value }
          : { ...valueOption }
      );

      setVariant({ ...variant, options: options });
    },
    [variant]
  );

  const handleChangeQuantity = (e) => {
    const quantity = e.target.value;
    setVariant({ ...variant, quantity: (quantity >= 0 && quantity) || 0 });
  };

  const handleChangeRegularPrice = (e) => {
    const regular_price = e.target.value;
    setVariant({
      ...variant,
      regular_price: (regular_price >= 0 && regular_price) || 0,
    });
  };

  const handleChangeSalePrice = (e) => {
    const sale_price = e.target.value;
    setVariant({
      ...variant,
      sale_price: (sale_price >= 0 && sale_price) || 0,
    });
  };

  const onSubmit = () => {
    if (!!errors.name || !!errors.options.length) {
      setHasErrors(true);

      setTimeout(() => {
        setHasErrors(false);
      }, 500);

      return;
    }

    onClose();
    onUpdateVariant(variant);
  };

  const handleClose = () => {
    if (!!errors.name || !!errors.options.length) {
      setHasErrors(true);

      setTimeout(() => {
        setHasErrors(false);
      }, 500);

      return;
    }

    onClose();
  };

  return (
    <CustomDialog
      maxWidth="sm"
      open={open}
      hasErrors={hasErrors}
      onClose={handleClose}
    >
      <DialogTitle>{t('Quick Update')}</DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={t('Title')}
            name="name"
            type="text"
            value={variant.name}
            onChange={handleChangeName}
            error={!!errors.name}
            helperText={!!errors.name && errors.name}
          />

          {variant.options?.map((option, index) => (
            <TextField
              key={option.name}
              fullWidth
              label={t(option.name)}
              name={option.value}
              value={option.value}
              onChange={handleChangeOption(index)}
              error={errors.options?.includes(index)}
              helperText={
                errors.options?.includes(index) && t('This field is required!')
              }
            />
          ))}

          <TextField
            fullWidth
            label={t('Quantity')}
            type="number"
            name="quantity"
            value={variant.quantity || 0}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            onChange={handleChangeQuantity}
          />

          <TextField
            fullWidth
            label={t('Regular Price')}
            type="number"
            name="regular_price"
            value={variant.regular_price || 0}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            onChange={handleChangeRegularPrice}
          />

          <TextField
            fullWidth
            label={t('Sale Price')}
            type="number"
            name="sale_price"
            value={variant.sale_price || 0}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            onChange={handleChangeSalePrice}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          width="100%"
          justifyContent="space-between"
        >
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('Delete')}
          </Button>

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              {t('Cancel')}
            </Button>

            <LoadingButton variant="contained" onClick={onSubmit}>
              {t('Save')}
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

ProductVariantQuickEditForm.propTypes = {
  row: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onUpdateVariant: PropTypes.func,
};

export default ProductVariantQuickEditForm;
