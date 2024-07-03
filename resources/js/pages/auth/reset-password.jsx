import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthLayout from '@/layouts/auth-layout';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useBoolean } from '@/hooks/use-boolean';
import { Iconify } from '@/components/icons';
import { SentIcon } from '@/assets/icons';

ResetPassword.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string,
};

export default function ResetPassword({ token, email }) {
  const showPassword = useBoolean();
  const showPasswordConfirmation = useBoolean();

  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
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

    post(route('password.store'));
  };

  return (
    <AuthLayout>
      <Head title="Reset Password" />

      <Box sx={{ my: 'auto' }}>
        <Stack spacing={3} alignItems="center">
          <SentIcon sx={{ height: 96 }} />

          <Typography variant="h3">Reset Password</Typography>

          <form onSubmit={submit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id="email"
                type="email"
                name="email"
                label="Email Address"
                value={data.email}
                autoFocus
                onChange={(e) => setData('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
                onChange={(e) =>
                  setData('password_confirmation', e.target.value)
                }
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
                color="inherit"
                size="large"
                fullWidth
                type="submit"
                variant="contained"
                loading={processing}
              >
                Reset Password
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
