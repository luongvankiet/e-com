import React from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from '@inertiajs/react';
import PermissionBasedGuard from '@/contexts/permission-based-guard';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { useAppContext } from '@/contexts/app/app-context';
import { route } from 'ziggy-js';
import { countries } from '@/assets/data';
import { Iconify } from '@/components/icons';

const UserQuickEditForm = ({ user, roles, open, onClose, onDeleteRow }) => {
  const { t } = useLocales();
  const { hasPermissions } = useAppContext();

  const { data, setData, put, processing, errors } = useForm({
    ...user,
  });

  const submit = (e) => {
    e.preventDefault();

    put(route(routes.dashboard.settings.users.update, user.id), {
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

        <PermissionBasedGuard permissions={['users.update']}>
          <DialogContent sx={{ py: 2 }}>
            <Stack spacing={3} sx={{ mt: 1 }}>
              {!user.email_verified_at && (
                <Alert variant="outlined" severity="info">
                  {t('Account is waiting for confirmation.')}
                </Alert>
              )}

              <Grid container spacing={2}>
                {hasPermissions('users.assign-roles') && (
                  <Grid xs={12} md={12} container>
                    <Grid xs={12} md={6}>
                      <Autocomplete
                        options={roles}
                        getOptionLabel={(option) => option.display_name || ''}
                        value={data.role}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value?.id
                        }
                        onChange={(event, value) => setData('role', value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t('Role')}
                            error={!!errors?.role}
                            helperText={errors?.role}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}

                <Grid xs={12} md={6}>
                  <TextField
                    error={!!errors?.first_name}
                    fullWidth
                    helperText={errors?.first_name}
                    label={t('First Name')}
                    name="first_name"
                    onChange={(e) => setData('first_name', e.target.value)}
                    type="text"
                    value={data.first_name}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    error={!!errors?.last_name}
                    fullWidth
                    helperText={errors?.last_name}
                    label={t('Last Name')}
                    name="last_name"
                    onChange={(e) => setData('last_name', e.target.value)}
                    type="text"
                    value={data.last_name}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    error={!!errors?.email}
                    fullWidth
                    helperText={errors?.email}
                    label={t('Email')}
                    name="email"
                    onChange={(e) => setData('email', e.target.value)}
                    type="text"
                    value={data.email}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    error={!!errors?.phone}
                    fullWidth
                    helperText={errors?.phone}
                    label={t('Phone number')}
                    name="phone"
                    onChange={(e) => setData('phone', e.target.value)}
                    type="text"
                    value={data.phone || ''}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    error={!!errors?.address_line_1}
                    fullWidth
                    helperText={errors?.address_line_1}
                    label={t('Address Line 1')}
                    name="address_line_1"
                    onChange={(e) =>
                      setData('default_address', {
                        ...data.default_address,
                        address_line_1: e.target.value,
                      })
                    }
                    type="text"
                    value={data.default_address.address_line_1 || ''}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('Address Line 2 (Optional)')}
                    name="address_line_2"
                    onChange={(e) =>
                      setData('default_address', {
                        ...data.default_address,
                        address_line_2: e.target.value,
                      })
                    }
                    type="text"
                    value={data.default_address.address_line_2 || ''}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('City/Suburb')}
                    name="city"
                    onChange={(e) =>
                      setData('default_address', {
                        ...data.default_address,
                        city: e.target.value,
                      })
                    }
                    type="text"
                    value={data.default_address.city || ''}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('State/Region')}
                    name="state"
                    onChange={(e) =>
                      setData('default_address', {
                        ...data.default_address,
                        state: e.target.value,
                      })
                    }
                    type="text"
                    value={data.default_address.state || ''}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('Postcode')}
                    name="postcode"
                    onChange={(e) =>
                      setData('default_address', {
                        ...data.default_address,
                        postcode: e.target.value,
                      })
                    }
                    type="text"
                    value={data.default_address.postcode || ''}
                  />
                </Grid>

                <Grid xs={12} md={6}>
                  <Autocomplete
                    name="country"
                    label={t('Country')}
                    value={data.default_address?.country}
                    options={countries.map((country) => country.label)}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) =>
                      setData('default_address', {
                        ...data.default_address,
                        country: value,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('Country')}
                        error={!!errors?.country}
                        helperText={errors?.country}
                      />
                    )}
                    renderOption={(props, option) => {
                      const { code, label, phone } = countries.filter(
                        (country) => country.label === option
                      )[0];

                      if (!label) {
                        return null;
                      }

                      return (
                        <li {...props} key={label}>
                          <Iconify
                            key={label}
                            icon={`circle-flags:${code.toLowerCase()}`}
                            width={28}
                            sx={{ mr: 1 }}
                          />
                          {label} ({code}) +{phone}
                        </li>
                      );
                    }}
                  />
                </Grid>
              </Grid>
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

UserQuickEditForm.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default UserQuickEditForm;
