import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocales } from '@/locales';
import { useAppContext } from '@/contexts/app/app-context';
import { router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { routes } from '@/routes';
import { enqueueSnackbar } from 'notistack';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { UploadAvatar } from '@/components/upload';
import { fData } from '@/utils/format-number';
import { LoadingButton } from '@mui/lab';
import { countries } from '@/assets/data';
import { Iconify } from '@/components/icons';
import Grid from '@mui/material/Unstable_Grid2';
import RouterLink from '@/components/router-link';
import { useBoolean } from '@/hooks/use-boolean';
import Label from '@/components/label';
import { ConfirmDialog } from '@/components/custom-dialog';
import ErrorAlert from '@/components/error-alert';

const UserCreateEditForm = ({ user, roles }) => {
  const { t } = useLocales();

  const { hasPermissions } = useAppContext();

  const [
    emailVerificationNotificationMessage,
    setEmailVerificationNotificationMessage,
  ] = useState('');

  const confirmDelete = useBoolean();
  const showPassword = useBoolean();
  const showPasswordConfirmation = useBoolean();
  const sendingEmail = useBoolean();

  const { data, setData, post, processing, errors } = useForm({
    _method: user ? 'put' : 'post',
    ...user,
  });

  const submit = (e) => {
    e.preventDefault();

    const path = user
      ? route(routes.dashboard.settings.users.update, user.id)
      : route(routes.dashboard.settings.users.store);

    post(path, {
      preserveScroll: true,
      onSuccess: () => {
        enqueueSnackbar(t(`${user ? 'Updated' : 'Created'} successfully!`), {
          variant: 'success',
        });
      },
      onError: (error) => {
        enqueueSnackbar(
          t(error?.message || `Failed to ${user ? 'update' : 'create'}!`),
          {
            variant: 'error',
          }
        );
      },
    });
  };

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

  const handleToggleVerifiedEmail = useCallback(
    (checked) => {
      setData('email_verified_at', checked ? new Date() : null);
    },
    [data]
  );

  const onSendEmailVerification = () => {
    sendingEmail.onTrue();

    router.post(
      route(routes.dashboard.settings.users.resendVerifyEmail),
      { email: user.email },
      {
        onError: (error) => {
          setEmailVerificationNotificationMessage(
            t(error?.message || 'Failed to send email!')
          );
        },
        onFinish: () => {
          sendingEmail.onFalse();
        },
      }
    );
  };

  const handleDelete = useCallback(() => {
    router.delete(route(routes.dashboard.settings.users.destroy, user.id), {
      onSuccess: () => {
        enqueueSnackbar(t('Deleted successfully!'), { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar(t(error?.message || t('Failed to delete!')), {
          variant: 'error',
        });
      },
    });
  }, [user]);

  return (
    <>
      <form noValidate onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              {user && (
                <Label
                  color={
                    (!!user.email_verified_at && 'success') ||
                    (!user.email_verified_at && 'warning') ||
                    'error'
                  }
                  sx={{ position: 'absolute', top: 24, right: 24 }}
                >
                  {(!!user.email_verified_at && t('Verified')) ||
                    (!user.email_verified_at && t('Pending'))}
                </Label>
              )}

              <UploadAvatar
                file={data.image?.url || data.image}
                onDrop={handleDrop}
                onDelete={() => {
                  setData('image', null);
                }}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    {t('Allowed *.jpeg, *.jpg, *.png, *.gif. Max size of')}{' '}
                    {fData(3145728)}
                  </Typography>
                }
              />

              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    checked={!!data.email_verified_at}
                    onChange={(event) =>
                      handleToggleVerifiedEmail(event.target.checked)
                    }
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {t('Email Verified')}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {t(
                        'Disabling this will automatically send the user a verification email'
                      )}
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  my: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />

              {emailVerificationNotificationMessage && (
                <Alert severity="success">
                  {(emailVerificationNotificationMessage ===
                    'verification-link-sent' &&
                    t(
                      'A new verification link has been sent to your email address.'
                    )) ||
                    emailVerificationNotificationMessage}
                </Alert>
              )}

              {user && (
                <Stack alignItems="center" sx={{ mt: 3 }} spacing={2}>
                  <LoadingButton
                    fullWidth
                    variant="soft"
                    color="secondary"
                    onClick={onSendEmailVerification}
                  >
                    {t('Resend Verification Email')}
                  </LoadingButton>

                  {hasPermissions('users.delete') && (
                    <LoadingButton
                      fullWidth
                      variant="soft"
                      color="error"
                      onClick={confirmDelete.onTrue}
                    >
                      {t('Delete Account')}
                    </LoadingButton>
                  )}
                </Stack>
              )}
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Stack spacing={2}>
              <Card>
                <CardHeader
                  title={t('Account Information')}
                  subheader={t('(*) is required field')}
                  subheaderTypographyProps={{ typography: 'caption' }}
                />
                <CardContent>
                  <Stack spacing={3}>
                    {errors && <ErrorAlert errors={errors} />}

                    <Grid container spacing={2}>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={`${t('First Name')}*`}
                          name="first_name"
                          value={data.first_name || ''}
                          error={!!errors?.first_name}
                          helperText={errors?.first_name}
                          onChange={(e) =>
                            setData('first_name', e.target.value)
                          }
                        />
                      </Grid>

                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={`${t('Last Name')}*`}
                          name="last_name"
                          value={data.last_name || ''}
                          error={!!errors?.last_name}
                          helperText={errors?.last_name}
                          onChange={(e) => setData('last_name', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={12} md={6}>
                        <TextField
                          type="email"
                          fullWidth
                          label={`${t('Email')}*`}
                          name="email"
                          value={data.email || ''}
                          error={!!errors?.email}
                          helperText={errors?.email}
                          onChange={(e) => setData('email', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={`${t('Phone Number')}*`}
                          name="phone"
                          value={data.phone || ''}
                          error={!!errors?.phone}
                          helperText={errors?.phone}
                          onChange={(e) => setData('phone', e.target.value)}
                        />
                      </Grid>

                      <Grid xs={12} md={6}>
                        <Autocomplete
                          fullWidth
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
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title={t('Address')} />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t('Address Line 1')}
                        name="address_line_1"
                        value={data.default_address?.address_line_1 || ''}
                        error={!!errors?.address_line_1}
                        helperText={errors?.address_line_1}
                        onChange={(e) =>
                          setData('default_address', {
                            ...data.default_address,
                            address_line_1: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t('Address Line 2 (Optional)')}
                        name="address_line_2"
                        value={data.default_address?.address_line_2 || ''}
                        error={!!errors?.address_line_2}
                        helperText={errors?.address_line_2}
                        onChange={(e) =>
                          setData('default_address', {
                            ...data.default_address,
                            address_line_2: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t('City/Suburb')}
                        name="city"
                        value={data.default_address?.city || ''}
                        error={!!errors?.city}
                        helperText={errors?.city}
                        onChange={(e) =>
                          setData('default_address', {
                            ...data.default_address,
                            city: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t('State')}
                        name="state"
                        value={data.default_address?.state || ''}
                        error={!!errors?.state}
                        helperText={errors?.state}
                        onChange={(e) =>
                          setData('default_address', {
                            ...data.default_address,
                            state: e.target.value,
                          })
                        }
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

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t('Postcode')}
                        name="postcode"
                        value={data.default_address?.postcode || ''}
                        error={!!errors?.postcode}
                        helperText={errors?.postcode}
                        onChange={(e) =>
                          setData('default_address', {
                            ...data.default_address,
                            postcode: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title={t('Password')} />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t('Password')}
                        name="password"
                        value={data.password}
                        error={!!errors?.password}
                        helperText={errors?.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type={showPassword.value ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={showPassword.onToggle}
                                edge="end"
                              >
                                <Iconify
                                  icon={
                                    showPassword.value
                                      ? 'solar:eye-bold'
                                      : 'solar:eye-closed-bold'
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={t('Confirm Password')}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        error={!!errors?.password_confirmation}
                        helperText={errors?.password_confirmation}
                        onChange={(e) =>
                          setData('password_confirmation', e.target.value)
                        }
                        type={
                          showPasswordConfirmation.value ? 'text' : 'password'
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={showPasswordConfirmation.onToggle}
                                edge="end"
                              >
                                <Iconify
                                  icon={
                                    showPasswordConfirmation.value
                                      ? 'solar:eye-bold'
                                      : 'solar:eye-closed-bold'
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid xs={12}>
                      <Grid xs={12} md={6}>
                        <Box>
                          <Typography variant="body2">
                            {t(
                              'Paswords must be at least 8 characters long and have:'
                            )}
                          </Typography>
                          <ul>
                            <li>
                              <Typography variant="body2">
                                {t('at least')}{' '}
                                <b>{t('one uppercase letter')}</b>
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                {t('at least')}{' '}
                                <b>{t('one lowercase letter')}</b>
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                {t('at least')} <b>{t('one digit')}</b>
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                {t('at least')}{' '}
                                <b>{t('one special character')}</b>
                              </Typography>
                            </li>
                          </ul>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button
                  component={RouterLink}
                  href={route(routes.dashboard.settings.users.index)}
                  variant="outlined"
                >
                  {t('Cancel')}
                </Button>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={processing}
                >
                  {t(!user ? 'Create Account' : 'Save Changes')}
                </LoadingButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </form>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title={t('Delete')}
        content={t('Are you sure want to delete this account?')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('Delete')}
          </Button>
        }
      />
    </>
  );
};

UserCreateEditForm.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.array,
};

export default UserCreateEditForm;
