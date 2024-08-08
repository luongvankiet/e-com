import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useLocales } from '@/locales';
import { useResponsive } from '@/hooks/use-responsive';
import Grid from '@mui/material/Unstable_Grid2';

const ProductPricingForm = ({ data, setData, errors }) => {
  const { t } = useLocales();

  const mdUp = useResponsive('up', 'md');

  const handleChangePrice = (e) => {
    const price = e.target.value;
    setData('regular_price', (price >= 0 && price) || 0);
  };

  const handleChangeDiscountPrice = (e) => {
    const sale_price = e.target.value;
    setData('sale_price', (sale_price >= 0 && sale_price) || 0);
  };

  return (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {t('Pricing')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('Price related inputs')}
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          <CardHeader title={t('Pricing')} />
          <CardContent>
            <Stack spacing={3}>
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                }}
                error={!!errors?.regular_price}
                helperText={errors?.regular_price}
                onChange={handleChangePrice}
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                }}
                error={!!errors?.sale_price}
                helperText={errors?.sale_price}
                onChange={handleChangeDiscountPrice}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

ProductPricingForm.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  errors: PropTypes.object,
};

export default ProductPricingForm;
