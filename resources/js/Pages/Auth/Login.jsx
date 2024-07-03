import { Iconify } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useBoolean } from '@/hooks/use-boolean';
import AuthLayout from '@/layouts/auth-layout';
import paths from '@/paths';
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

    post(paths.auth.login.route);
  };

  return (
    <AuthLayout>
      <Head title="Login" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography variant="h4">Sign in</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">Not a member?</Typography>

            <Link
              component={RouterLink}
              href={route(paths.auth.register.route)}
              variant="subtitle2"
            >
              Create an account
            </Link>
          </Stack>

          <form noValidate onSubmit={submit}>
            <Stack spacing={2.5}>
              {!!status && <Alert severity="error">{status}</Alert>}

              <TextField
                error={!!errors?.email}
                fullWidth
                helperText={errors?.email}
                label="Email Address"
                name="email"
                onChange={(e) => setData('email', e.target.value)}
                type="email"
                value={data.email}
              />

              <TextField
                error={!!errors?.password}
                fullWidth
                helperText={errors?.password}
                label="Password"
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
                  href={route('password.request')}
                  variant="body2"
                  color="inherit"
                  underline="always"
                  sx={{ alignSelf: 'flex-end' }}
                >
                  Forgot your password?
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
                Login
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
