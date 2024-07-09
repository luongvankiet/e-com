/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import RouterLink from '@/components/router-link';
import AuthLayout from '@/layouts/auth/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { route } from 'ziggy-js';
import { EmailInboxIcon } from '@/assets/icons';
import { useLocales } from '@/locales';

VerifyEmail.propTypes = {
  status: PropTypes.string,
};

export default function VerifyEmail({ status }) {
  const { t } = useLocales();

  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <AuthLayout>
      <Head title="Email Verification" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={2} alignItems="center" sx={{ mb: 5 }}>
          <EmailInboxIcon sx={{ height: 96 }} />

          <Typography variant="h3">{t('Verify Email')}</Typography>

          <Typography variant="body1">
            {t(
              "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
            )}
          </Typography>

          {status === 'verification-link-sent' && (
            <Alert severity="success">
              {t(
                'A new verification link has been sent to your email address.'
              )}
            </Alert>
          )}
        </Stack>

        <form onSubmit={submit}>
          <Stack direction="row" spacing={2}>
            <LoadingButton
              color="inherit"
              size="large"
              fullWidth
              type="submit"
              variant="contained"
              loading={processing}
              sx={{ textWrap: 'nowrap', px: 10 }}
            >
              {t('Resend Verification Email')}
            </LoadingButton>

            <Button
              component={RouterLink}
              color="inherit"
              size="large"
              fullWidth
              type="submit"
              variant="soft"
              href={route('logout')}
            >
              {t('Logout')}
            </Button>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
