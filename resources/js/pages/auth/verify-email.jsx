/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import RouterLink from '@/components/router-link';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { route } from 'ziggy-js';

VerifyEmail.propTypes = {
  status: PropTypes.string,
};

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <AuthLayout>
      <Head title="Email Verification" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography variant="h4">Verify Email</Typography>

          <Typography variant="body1">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.
          </Typography>

          {status === 'verification-link-sent' && (
            <Alert severity="success">
              A new verification link has been sent to the email address you
              provided during registration.
            </Alert>
          )}

          <form onSubmit={submit}>
            <Stack direction="row" spacing={2}>
              <LoadingButton
                color="inherit"
                size="large"
                fullWidth
                type="submit"
                variant="contained"
                loading={processing}
              >
                Resend Verification Email
              </LoadingButton>

              <Button
                component={RouterLink}
                color="inherit"
                size="large"
                type="submit"
                variant="soft"
                href={route('logout')}
                sx={{ px: 4 }}
              >
                Logout
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
