import React from 'react';
import { ConfirmDialog } from '@/components/custom-dialog';
import { useBoolean } from '@/hooks/use-boolean';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { router, useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { route } from 'ziggy-js';
import ProductVariantDetailForm from './product-variant-detail-form';
import ProductVariantImageForm from './product-variant-image-form';
import ProductVariantList from './product-variant-list';
import ProductVariantOptionsForm from './product-variant-options-form';
import RouterLink from '@/components/router-link';

const ProductVariantForm = ({ product, variant }) => {
  const { t } = useLocales();

  const confirmDelete = useBoolean();

  const { data, setData, post, processing, errors } = useForm({
    _method: variant ? 'put' : 'post',
    ...variant,
    options: variant?.options?.length
      ? variant?.options
      : product.options?.map((option) => ({ name: option.name, value: '' })),
    quantity: variant?.quantity || 0,
    regular_price: variant?.regular_price || 0,
    sale_price: variant?.sale_price || 0,
  });

  const submit = (e) => {
    e.preventDefault();

    const path = variant
      ? route(routes.dashboard.variants.update, [product.id, variant.id])
      : route(routes.dashboard.variants.store, [product.id]);

    post(path, {
      preserveScroll: true,
      onSuccess: () => {
        enqueueSnackbar(t(`${variant ? 'Updated' : 'Created'} successfully!`), {
          variant: 'success',
        });
      },
      onError: (error) => {
        console.warn(error);
        enqueueSnackbar(
          t(error?.message || `Failed to ${variant ? 'update' : 'create'}!`),
          {
            variant: 'error',
          }
        );
      },
    });
  };

  const handleDelete = useCallback(() => {
    if (!product) {
      return;
    }

    router.delete(
      route(routes.dashboard.variants.destroy, [product.id, variant.id]),
      {
        preserveScroll: true,
        onSuccess: () => {
          enqueueSnackbar(t('Deleted successfully!'), { variant: 'success' });
        },
        onError: (error) => {
          enqueueSnackbar(t(error?.message || t('Failed to delete!')), {
            variant: 'error',
          });
        },
      }
    );
  }, [variant]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3}>
            <ProductVariantDetailForm
              data={data}
              setData={setData}
              errors={errors}
            />

            <ProductVariantOptionsForm
              product={product}
              data={data}
              setData={setData}
              errors={errors}
            />

            <ProductVariantImageForm
              data={data}
              setData={setData}
              errors={errors}
            />

            <Stack
              direction="row"
              spacing={2}
              width="100%"
              justifyContent="space-between"
            >
              <Stack>
                {variant && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={confirmDelete.onTrue}
                  >
                    {t('Delete')}
                  </Button>
                )}
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  component={RouterLink}
                  href={route(routes.dashboard.products.edit, product.id)}
                  variant="outlined"
                >
                  {t('Cancel')}
                </Button>

                <LoadingButton
                  variant="contained"
                  onClick={submit}
                  loading={processing}
                >
                  {t('Save')}
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <ProductVariantList product={product} variant={variant} />
        </Grid>
      </Grid>

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

ProductVariantForm.propTypes = {
  product: PropTypes.object,
  variant: PropTypes.object,
};

export default ProductVariantForm;
