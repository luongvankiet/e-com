import React from 'react';
import { ConfirmDialog } from '@/components/custom-dialog';
import RouterLink from '@/components/router-link';
import { TagsSelect } from '@/components/selects';
import CategoriesSelect from '@/components/selects/categories-select';
import { Upload } from '@/components/upload';
import { useAppContext } from '@/contexts/app/app-context';
import { useBoolean } from '@/hooks/use-boolean';
import { useResponsive } from '@/hooks/use-responsive';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { router, useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { route } from 'ziggy-js';

const BrandCreateEditForm = ({ brand }) => {
  const { t } = useLocales();

  const { hasPermissions } = useAppContext();

  const confirmDelete = useBoolean();

  const mdUp = useResponsive('up', 'md');

  const { data, setData, post, processing, errors } = useForm({
    _method: brand ? 'put' : 'post',
    ...brand,
  });

  const submit = (e) => {
    e.preventDefault();

    const path = brand
      ? route(routes.dashboard.brands.update, brand.id)
      : route(routes.dashboard.brands.store);

    post(path, {
      preserveScroll: true,
      onSuccess: () => {
        enqueueSnackbar(t(`${brand ? 'Updated' : 'Created'} successfully!`), {
          variant: 'success',
        });
      },
      onError: (error) => {
        enqueueSnackbar(
          t(error?.message || `Failed to ${brand ? 'update' : 'create'}!`),
          {
            variant: 'error',
          }
        );
      },
    });
  };

  const handleDelete = useCallback(() => {
    router.delete(route(routes.dashboard.brands.destroy, brand.id), {
      onSuccess: () => {
        enqueueSnackbar(t('Deleted successfully!'), { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar(t(error?.message || t('Failed to delete!')), {
          variant: 'error',
        });
      },
    });
  }, [brand]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setData(
          'image',
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );
      }
    },
    [data]
  );

  return (
    <>
      <form noValidate onSubmit={submit}>
        <Grid container spacing={2}>
          {mdUp && (
            <Grid md={4}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {t('Details')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('Title, short description, image...')}
              </Typography>
            </Grid>
          )}

          <Grid xs={12} md={8}>
            <Card>
              {!mdUp && (
                <CardHeader
                  title={t('Details')}
                  subheader={t('(*) is required field')}
                />
              )}
              <CardContent>
                <Stack spacing={3}>
                  {/* {errors && <ErrorAlert errors={errors} />} */}

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
                    type="text"
                    fullWidth
                    multiline
                    label={t('Description')}
                    name="description"
                    rows={10}
                    value={data.description || ''}
                    onChange={(e) => setData('description', e.target.value)}
                  />

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

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Image</Typography>
                    <Upload
                      file={data.image?.url || data.image?.preview}
                      name="image"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      onDelete={() => setData('image', null)}
                    />
                    {errors?.image && (
                      <Typography variant="caption" color="error">
                        {errors?.image}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

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
              {brand && hasPermissions('brands.delete') && (
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
                href={route(routes.dashboard.brands.index)}
              >
                {t('Cancel')}
              </Button>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={processing}
              >
                {t(!brand ? 'Create Brand' : 'Save Changes')}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title={t('Delete')}
        content={t('Are you sure want to delete this brand?')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('Delete')}
          </Button>
        }
      />
    </>
  );
};

BrandCreateEditForm.propTypes = {
  brand: PropTypes.object,
};

export default BrandCreateEditForm;
