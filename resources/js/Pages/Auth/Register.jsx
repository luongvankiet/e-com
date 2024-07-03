import { Iconify } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useBoolean } from '@/hooks/use-boolean';
import AuthLayout from '@/layouts/auth-layout';
import paths from '@/paths';
import { Head, useForm } from '@inertiajs/react';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { route } from 'ziggy-js';

export default function Register() {
  const showPassword = useBoolean();
  const showPasswordConfirmation = useBoolean();

  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('register'));
  };

  return (
    <AuthLayout>
      <Head title="Register" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Typography variant="h4">Create New Account</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">Already have an account?</Typography>

            <Link
              component={RouterLink}
              href={paths.auth.login.route}
              variant="subtitle2"
            >
              Sign in
            </Link>
          </Stack>
        </Stack>

        <form onSubmit={submit}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={2}>
              <TextField
                error={!!errors?.first_name}
                fullWidth
                helperText={errors?.first_name}
                label="First Name"
                name="first_name"
                onChange={(e) => setData('first_name', e.target.value)}
                type="first_name"
                value={data.first_name}
              />

              <TextField
                error={!!errors?.last_name}
                fullWidth
                helperText={errors?.last_name}
                label="Last Name"
                name="last_name"
                onChange={(e) => setData('last_name', e.target.value)}
                type="last_name"
                value={data.last_name}
              />
            </Stack>

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
              type={showPassword.value ? 'text' : 'password'}
              value={data.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
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

            <TextField
              error={!!errors?.password_confirmation}
              fullWidth
              helperText={errors?.password_confirmation}
              label="Password Confirmation"
              name="password_confirmation"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              type={showPasswordConfirmation.value ? 'text' : 'password'}
              value={data.password_confirmation}
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

            <Box>
              <Typography variant="body2">
                Paswords must be at least 8 characters long and have:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    at least <b>one uppercase letter</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    at least <b>one lowercase letter</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    at least <b>one digit</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    at least <b>one special character</b>
                  </Typography>
                </li>
              </ul>
            </Box>

            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={processing}
            >
              Create Account
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
