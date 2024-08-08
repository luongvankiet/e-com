import React from 'react';
import ErrorAlert from '@/components/error-alert';
import PermissionBasedGuard from '@/contexts/permission-based-guard';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { route } from 'ziggy-js';
import { TagsSelect } from '@/components/selects';
import { CategoriesSelect } from '@/components/selects';

const BrandQuickEditForm = ({ brand, open, onClose, onDeleteRow }) => {
  const { t } = useLocales();

  const { data, setData, put, processing, errors } = useForm({
    ...brand,
  });

  const submit = (e) => {
    e.preventDefault();

    put(route(routes.dashboard.brands.update, brand.id), {
      onSuccess: () => {
        enqueueSnackbar(t('Updated successfully!'), { variant: 'success' });
        onClose();
      },
      onError: (error) => {
        enqueueSnackbar(t(error?.message), { variant: 'error' });
      },
    });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <form noValidate onSubmit={submit}>
        <DialogTitle>{t('Quick Update')}</DialogTitle>

        <PermissionBasedGuard permissions={['brands.update']}>
          <DialogContent sx={{ py: 2 }}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <ErrorAlert errors={errors} />
              <TextField
                fullWidth
                label={t('Title')}
                name="name"
                type="text"
                value={data.name}
                error={!!errors?.name}
                helperText={errors?.name}
                onChange={(event) => setData('name', event.target.value)}
              />
              <TextField
                type="text"
                fullWidth
                multiline
                label="Description"
                name="description"
                rows={3}
                value={data.description}
                error={!!errors?.description}
                helperText={errors?.description}
                onChange={(event) => setData('description', event.target.value)}
              />

              <CategoriesSelect data={data} setData={setData} multiple />

              <TagsSelect
                value={data.tags_name || []}
                onChange={(event, value) => {
                  setData('tags_name', value);
                }}
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
              />

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="error" onClick={onDeleteRow}>
                  {t('Delete')}
                </Button>

                <Button variant="outlined" onClick={onClose}>
                  {t('Cancel')}
                </Button>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={processing}
                >
                  {t('Save')}
                </LoadingButton>
              </Stack>
            </Stack>
          </DialogActions>
        </PermissionBasedGuard>
      </form>
    </Dialog>
  );
};

BrandQuickEditForm.propTypes = {
  brand: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default BrandQuickEditForm;
