import { Iconify, PasswordIcon } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useBoolean } from '@/hooks/use-boolean';
import { AuthLayout } from '@/layouts';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { route } from 'ziggy-js';

Login.propTypes = {
  status: PropTypes.string,
  canResetPassword: PropTypes.bool,
};

export default function Login({ status, canResetPassword }) {
  const { t } = useLocales();

  const password = useBoolean();

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(routes.auth.login);
  };

  return (
    <AuthLayout>
      <Head title="Login" />

      <Box sx={{ my: 'auto', width: 350 }}>
        <Stack spacing={2} sx={{ mb: 5 }} alignItems="center">
          {/* <PasswordIcon sx={{ height: 96 }} /> */}

          <Typography variant="h3">{t('Sign In')}</Typography>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <Typography variant="body1">{t('Not a member?')}</Typography>

            <Link
              component={RouterLink}
              href={route(routes.auth.register)}
              variant="subtitle1"
            >
              {t('Create an account')}
            </Link>
          </Stack>
        </Stack>

        <form onSubmit={submit}>
          <Stack spacing={2.5}>
            {!!status && <Alert severity="error">{status}</Alert>}

            <TextField
              error={!!errors?.email}
              fullWidth
              helperText={t(errors?.email)}
              label={t('Email Address')}
              name="email"
              onChange={(e) => setData('email', e.target.value)}
              type="email"
              value={data.email}
            />

            <TextField
              error={!!errors?.password}
              fullWidth
              helperText={errors?.password}
              label={t('Password')}
              name="password"
              onChange={(e) => setData('password', e.target.value)}
              type={password.value ? 'text' : 'password'}
              value={data.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify
                        icon={
                          password.value
                            ? 'solar:eye-bold'
                            : 'solar:eye-closed-bold'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {canResetPassword && (
              <Link
                component={RouterLink}
                href={route(routes.auth.forgotPassword)}
                variant="body2"
                color="inherit"
                underline="always"
                sx={{ alignSelf: 'flex-end' }}
              >
                {t('Forgot your password?')}
              </Link>
            )}

            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={processing}
            >
              {t('Login')}
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
