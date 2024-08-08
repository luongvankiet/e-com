import React from 'react';
import PropTypes from 'prop-types';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocales } from '@/locales';
import { usePage } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { snakeToTitle } from '@/utils/string';
import BrandsSelect from '@/components/selects/brands-select';
import { CategoriesSelect, TagsSelect } from '@/components/selects';

const ProductPropertiesForm = ({ data, setData, errors }) => {
  const { t } = useLocales();

  const mdUp = useResponsive('up', 'md');

  const { product_statuses } = usePage().props;

  const handleChangeQuantity = (e) => {
    const quantity = e.target.value;
    setData('quantity', (quantity >= 0 && quantity) || 0);
  };

  return (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('Properties')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('Additional functions and attributes...')}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          <CardHeader title={t('Properties')} />
          <CardContent>
            <Stack spacing={3}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                <TextField
                  fullWidth
                  label={t('Product Code')}
                  name="product_code"
                  value={data.product_code || ''}
                  error={!!errors?.product_code}
                  helperText={errors?.product_code}
                  onChange={(e) => setData('product_code', e.target.value)}
                />

                <TextField
                  fullWidth
                  label={t('SKU')}
                  name="product_sku"
                  value={data.product_sku || ''}
                  error={!!errors?.product_sku}
                  helperText={errors?.product_sku}
                  onChange={(e) => setData('product_sku', e.target.value)}
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
                  error={!!errors?.quantity}
                  helperText={errors?.quantity}
                  onChange={handleChangeQuantity}
                />

                <FormControl
                  sx={{
                    flexShrink: 0,
                  }}
                >
                  <InputLabel>{t('Status')}</InputLabel>
                  <Select
                    value={data.status || 'new'}
                    input={<OutlinedInput label={t('Status')} />}
                    onChange={(e) => setData('status', e.target.value)}
                    sx={{ textTransform: 'capitalize' }}
                    renderValue={(selected) => t(snakeToTitle(selected))}
                  >
                    {product_statuses.map((option) => (
                      <MenuItem key={option} value={option}>
                        {t(snakeToTitle(option))}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <BrandsSelect
                  value={data.brand || null}
                  onChange={(event, value) => {
                    setData('brand', value);
                  }}
                />
              </Box>

              <CategoriesSelect
                value={data.categories || []}
                onChange={(event, value) => {
                  setData('categories', value);
                }}
                multiple
              />

              <TagsSelect
                value={data.tags_name || []}
                onChange={(event, value) => {
                  setData('tags_name', value);
                }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

ProductPropertiesForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  errors: PropTypes.object,
};

export default ProductPropertiesForm;
