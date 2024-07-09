import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AuthLayout from '@/layouts/auth/auth-layout';
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
import { useLocales } from '@/locales';

ResetPassword.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string,
};

export default function ResetPassword({ token, email }) {
  const { t } = useLocales();

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

      <Box sx={{ my: 'auto', width: 370 }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: 5 }}>
          <SentIcon sx={{ height: 96 }} />

          <Typography variant="h3">{t('Reset Password')}</Typography>
        </Stack>

        <form onSubmit={submit}>
          <Stack spacing={2}>
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
              helperText={errors.email}
            />

            <TextField
              error={!!errors?.password}
              fullWidth
              helperText={errors?.password}
              label={t('Password')}
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
              label={t('Confirm Password')}
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

            <Box sx={{mt:2, px: 1}}>
              <Typography variant="body2">
                {t('Paswords must be at least 8 characters long and have:')}
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    {t('at least')} <b>{t('one uppercase letter')}</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    {t('at least')} <b>{t('one lowercase letter')}</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    {t('at least')} <b>{t('one digit')}</b>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    {t('at least')} <b>{t('one special character')}</b>
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
              {t('Reset Password')}
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </AuthLayout>
  );
}
