import React from 'react';
import { ConfirmDialog } from '@/components/custom-dialog';
import RouterLink from '@/components/router-link';
import { useAppContext } from '@/contexts/app/app-context';
import { useBoolean } from '@/hooks/use-boolean';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { router, useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import { Button, FormControlLabel, Stack, Switch } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { route } from 'ziggy-js';
import ProductDetailForm from './partials/product-detail-form';
import ProductPricingForm from './partials/product-pricing-form';
import ProductPropertiesForm from './partials/product-properties-form';
import ProductVariantForm from './partials/product-variant-form';

const ProductForm = ({ product }) => {
  const { t } = useLocales();

  const { hasPermissions } = useAppContext();

  const mdUp = useResponsive('up', 'md');

  const updatingOptions = useBoolean();
  const confirmDelete = useBoolean();

  const defaultOption = { name: '', values: [] };

  const { data, setData, post, processing, errors } = useForm({
    _method: product ? 'put' : 'post',
    ...product,
    status: product?.status || 'new',
    options: (!!product?.options?.length && product.options) || [defaultOption],
    variants: product?.variants || [],
  });

  const submit = (e) => {
    e.preventDefault();

    const path = product
      ? route(routes.dashboard.products.update, product.id)
      : route(routes.dashboard.products.store);

    post(path, {
      preserveScroll: true,
      onSuccess: () => {
        updatingOptions.onFalse();
        enqueueSnackbar(t(`${product ? 'Updated' : 'Created'} successfully!`), {
          variant: 'success',
        });
        
        router.reload();
      },
      onError: (error) => {
        console.warn(error);
        enqueueSnackbar(
          t(error?.message || `Failed to ${product ? 'update' : 'create'}!`),
          {
            variant: 'error',
          }
        );
      },
    });
  };

  const handleDelete = useCallback(() => {
    router.delete(route(routes.dashboard.products.destroy, product.id), {
      onSuccess: () => {
        enqueueSnackbar(t('Deleted successfully!'), { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar(t(error?.message || t('Failed to delete!')), {
          variant: 'error',
        });
      },
    });
  }, [product]);

  return (
    <>
      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <ProductDetailForm data={data} setData={setData} errors={errors} />

          <ProductPropertiesForm
            data={data}
            setData={setData}
            errors={errors}
          />

          <ProductPricingForm data={data} setData={setData} errors={errors} />

          <ProductVariantForm
            product={product}
            data={data}
            setData={setData}
            errors={errors}
            defaultOption={defaultOption}
            updatingOptions={updatingOptions}
          />

          {mdUp && <Grid md={4} />}
          <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!!data.published_at}
                  onChange={(event) =>
                    setData(
                      'published_at',
                      event.target.checked ? new Date() : null
                    )
                  }
                />
              }
              label={t('Publish')}
              sx={{ flexGrow: 1, pl: 3 }}
            />

            <Stack direction="row" spacing={2}>
              {product && hasPermissions('products.delete') && (
                <LoadingButton
                  variant="contained"
                  color="error"
                  onClick={confirmDelete.onTrue}
                >
                  {t('Delete')}
                </LoadingButton>
              )}

              <Button
                variant="outlined"
                component={RouterLink}
                href={route(routes.dashboard.products.index)}
              >
                {t('Cancel')}
              </Button>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={processing}
              >
                {t(!product ? 'Create Product' : 'Save Changes')}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title={t('Delete')}
        content={t('Are you sure want to delete this product?')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('Delete')}
          </Button>
        }
      />
    </>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
};

export default ProductForm;
