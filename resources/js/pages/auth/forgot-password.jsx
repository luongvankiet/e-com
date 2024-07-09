import React from 'react';
import PropTypes from 'prop-types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthLayout from '@/layouts/auth/auth-layout';
import { Alert, Box, Typography, TextField, Stack } from '@mui/material';
import PasswordIcon from '@/components/icons/password-icon';
import { LoadingButton } from '@mui/lab';
import { useLocales } from '@/locales';

ForgotPassword.propTypes = {
  status: PropTypes.string,
};

export default function ForgotPassword({ status }) {
  const { t } = useLocales();

  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <AuthLayout>
      <Head title="Forgot Password" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <PasswordIcon sx={{ height: 96 }} />

          <Typography variant="h3">{t('Forgot your password?')}</Typography>

          <Typography variant="body1">
            {t(
              'Please enter the email address associated with your account and we will email you a link to reset your password.'
            )}
          </Typography>

          {status && <Alert severity="success">{t(status)}</Alert>}
        </Stack>

        <form onSubmit={submit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              id="email"
              type="email"
              name="email"
              label={t('Email Address')}
              value={data.email}
              autoFocus
              onChange={(e) => setData('email', e.target.value)}
              error={!!errors.email}
              helperText={t(errors.email)}
            />

            <LoadingButton
              color="inherit"
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              loading={processing}
            >
              {t('Email Password Reset Link')}
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
