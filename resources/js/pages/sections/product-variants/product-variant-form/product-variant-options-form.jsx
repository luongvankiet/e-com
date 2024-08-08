import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { useLocales } from '@/locales';

const ProductVariantOptionsForm = ({ product, data, setData, errors }) => {
  const { t } = useLocales();

  const handleChangeOption = useCallback(
    (index) => (e) => {
      const options = data.options?.map((valueOption, valueOptionIndex) =>
        valueOptionIndex === index
          ? { ...valueOption, value: e.target.value }
          : { ...valueOption }
      );

      setData('options', options);
    },
    [data]
  );

  return (
    <Card>
      <CardHeader title={t('Options')} />
      <CardContent>
        <Stack spacing={3}>
          {product.options?.map((option, index) => (
            <TextField
              key={`${option.name}-${index}`}
              fullWidth
              label={option.name}
              name={option.name}
              value={
                data.options.find(
                  (dataOption) => dataOption.name === option.name
                )?.value || ''
              }
              onChange={handleChangeOption(index)}
              error={!!errors && !!errors[`options.${index}.value`]}
              helperText={
                !!errors &&
                !!errors[`options.${index}.value`] &&
                errors[`options.${index}.value`]
              }
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

ProductVariantOptionsForm.propTypes = {
  product: PropTypes.object,
  data: PropTypes.object,
  setData: PropTypes.func,
  errors: PropTypes.object,
};

export default ProductVariantOptionsForm;
