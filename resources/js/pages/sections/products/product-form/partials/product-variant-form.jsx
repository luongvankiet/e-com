import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocales } from '@/locales';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Iconify } from '@/components/icons';
import { useBoolean } from '@/hooks/use-boolean';
import uuidv4 from '@/utils/uuidv4';
import { ProductVariantDataTable } from '../../../product-variants/product-variant-data-table';
import { usePage } from '@inertiajs/react';
import { ConfirmDialog } from '@/components/custom-dialog';
import ProductVariantTableForm from './product-variant-table-form';
import Label from '@/components/label';

const ProductVariantForm = ({
  product,
  data,
  setData,
  defaultOption,
  updatingOptions,
}) => {
  const { t } = useLocales();

  const mdUp = useResponsive('up', 'md');

  const { options = [], variants = [], variants_count = 0 } = usePage().props;

  const showConfirmUpdateOptions = useBoolean();

  const [variantOptions, setVariantOptions] = useState([]);

  const updateOption = (index, newNameOption, newValues) => {
    setData((prevData) => ({
      ...prevData,
      options: prevData.options.map((option, i) =>
        i === index
          ? {
              ...option,
              name: newNameOption,
              values: newValues || [],
            }
          : option
      ),
    }));
  };

  const handleChangeOption = useCallback(
    (index) => (e, value) => {
      updateOption(index, value, data.options[index].values);
    },
    [data]
  );

  const handleChangeOptionValues = useCallback(
    (index) => (e, values) => {
      e.preventDefault();

      const newValues = values.map((val) => {
        if (typeof val === 'string') {
          return {
            id: uuidv4(),
            value: val,
          };
        }

        return { ...val };
      });

      updateOption(index, data.options[index].name, newValues);
    },
    [data]
  );

  const handleAddOption = useCallback(() => {
    setData({
      ...data,
      options: (!!data.options?.length && [...data.options, defaultOption]) || [
        defaultOption,
      ],
    });
  }, [data]);

  const handleRemoveOption = useCallback(
    (index) => () => {
      const options = data.options.filter(
        (dataOption, dataOptionIndex) => dataOptionIndex !== index
      );

      setData({
        ...data,
        options: (!!options.length && options) || [defaultOption],
      });
    },
    [data]
  );

  const handleResetOptions = useCallback(() => {
    setData({
      ...data,
      options: (!!product?.options?.length && product.options) || [
        defaultOption,
      ],
      variants: variants,
    });

    updatingOptions.onFalse();
    showConfirmUpdateOptions.onFalse();
  }, [product, data, updatingOptions]);

  useEffect(() => {
    const variantOptions = options
      .filter(
        (option) =>
          !data.options.some((dataOption) => dataOption.name === option.name)
      )
      .map((variantOption) => variantOption.name);

    setVariantOptions(variantOptions);
  }, [data, options]);

  return (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('Variants')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('Manage product variants')}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontStyle: 'italic' }}
          >
            *{' '}
            {t(
              'If a variant is missing either the option or values field, the variant will not be created.'
            )}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          <CardHeader
            title={t('Variants')}
            action={
              <Stack direction="row" spacing={2}>
                {product && !updatingOptions.value ? (
                  <Button
                    variant="soft"
                    startIcon={<Iconify icon="solar:pen-bold" />}
                    onClick={showConfirmUpdateOptions.onTrue}
                  >
                    {t('Edit options')}
                  </Button>
                ) : (
                  <>
                    {product && (
                      <Button
                        variant="soft"
                        color="secondary"
                        startIcon={
                          <Iconify icon="material-symbols:settings-backup-restore-rounded" />
                        }
                        onClick={handleResetOptions}
                      >
                        {t('Restore options')}
                      </Button>
                    )}

                    <Button
                      variant="soft"
                      startIcon={<Iconify icon="mingcute:add-line" />}
                      onClick={handleAddOption}
                    >
                      {t('Add Option')}
                    </Button>
                  </>
                )}
              </Stack>
            }
          />
          <CardContent>
            <Stack spacing={3} divider={<Divider />}>
              <Grid container spacing={3}>
                {!!data.options?.length &&
                  data.options?.map((option, index) => (
                    <ProductOptionRow
                      key={`${option}-${index}`}
                      product={product}
                      variantOptions={variantOptions}
                      updatingOptions={updatingOptions}
                      option={option}
                      onChangeOption={handleChangeOption(index)}
                      onChangeOptionValues={handleChangeOptionValues(index)}
                      onRemoveOption={handleRemoveOption(index)}
                    />
                  ))}
              </Grid>

              {!updatingOptions.value && product && (
                <ProductVariantDataTable
                  product={product}
                  variants={variants}
                  total={variants_count}
                />
              )}

              {(updatingOptions.value || !product) && (
                <ProductVariantTableForm
                  product={product}
                  data={data}
                  setData={setData}
                />
              )}
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <ConfirmDialog
        open={showConfirmUpdateOptions.value}
        onClose={handleResetOptions}
        title={t('Confirm')}
        content={t(
          'Updating product options will automatically update all associated variants. This action cannot be undone. Are you sure you want to proceed?'
        )}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              showConfirmUpdateOptions.onFalse();
              updatingOptions.onTrue();
            }}
          >
            {t('Continue')}
          </Button>
        }
      />
    </>
  );
};

ProductVariantForm.propTypes = {
  product: PropTypes.object,
  defaultOption: PropTypes.object,
  data: PropTypes.object,
  setData: PropTypes.func,
  onUpdateVariant: PropTypes.func,
  updatingOptions: PropTypes.object,
};

export default ProductVariantForm;

const ProductOptionRow = ({
  option,
  product,
  variantOptions,
  updatingOptions,
  //
  onChangeOption,
  onChangeOptionValues,
  onRemoveOption,
}) => {
  const { t } = useLocales();

  return (
    <>
      {product && !updatingOptions.value ? (
        <>
          <Grid xs={12} md={6}>
            <Typography variant="subtitle1">{option.name}</Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack direction="row" spacing={2}>
              {option.values?.map((value, valueIndex) => (
                <Label key={`${value}-${valueIndex}`}>{value.value}</Label>
              ))}
            </Stack>
          </Grid>
        </>
      ) : (
        <>
          <Grid xs={12} md={4}>
            <Autocomplete
              fullWidth
              freeSolo
              disableClearable
              options={variantOptions}
              value={option.name || ''}
              onInputChange={onChangeOption}
              renderInput={(params) => (
                <TextField {...params} label={t('Options')} />
              )}
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Autocomplete
                fullWidth
                multiple
                freeSolo
                limitTags={5}
                options={[]}
                value={option.values?.map((optValue) => optValue.value) || []}
                onChange={onChangeOptionValues}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('Values')}
                    helperText={t('Press "Enter" to apply values')}
                  />
                )}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={option}>
                    <Checkbox size="small" disableRipple checked={selected} />
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={`${option}-${index}`}
                      label={option}
                      size="small"
                      color="secondary"
                    />
                  ))
                }
              />

              <IconButton color="error" onClick={onRemoveOption} sx={{ mt: 1 }}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Stack>
          </Grid>
        </>
      )}
    </>
  );
};

ProductOptionRow.propTypes = {
  option: PropTypes.object,
  product: PropTypes.object,
  variantOptions: PropTypes.array,
  updatingOptions: PropTypes.object,
  onChangeOption: PropTypes.func,
  onChangeOptionValues: PropTypes.func,
  onRemoveOption: PropTypes.func,
};
