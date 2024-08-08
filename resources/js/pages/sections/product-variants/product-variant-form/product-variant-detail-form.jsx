import React from 'react';
import PropTypes from 'prop-types';
import { useLocales } from '@/locales';
import { Card, Stack, TextField, CardHeader, CardContent } from '@mui/material';

const ProductVariantDetailForm = ({ data, setData, errors }) => {
  const { t } = useLocales();

  const handleChangeQuantity = (e) => {
    const quantity = e.target.value;
    setData('quantity', (quantity >= 0 && quantity) || 0);
  };

  const handleChangeRegularPrice = (e) => {
    const regular_price = e.target.value;
    setData('regular_price', (regular_price >= 0 && regular_price) || 0);
  };

  const handleChangeSalePrice = (e) => {
    const sale_price = e.target.value;
    setData('sale_price', (sale_price >= 0 && sale_price) || 0);
  };

  return (
    <Card>
      <CardHeader title={t('Detail')} />

      <CardContent>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label={`${t('Name')}*`}
            name="name"
            value={data.name || ''}
            error={!!errors?.name}
            helperText={errors?.name}
            onChange={(e) => setData('name', e.target.value)}
          />

          <TextField
            fullWidth
            label={t('Quantity')}
            type="number"
            name="quantity"
            value={data.quantity || 0}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            onChange={handleChangeQuantity}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label={t('Regular Price')}
              type="number"
              name="regular_price"
              value={data.regular_price || 0}
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
              value={data.sale_price || 0}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              onChange={handleChangeSalePrice}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

ProductVariantDetailForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  errors: PropTypes.object,
};

export default ProductVariantDetailForm;
