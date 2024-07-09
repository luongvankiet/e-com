import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { route } from 'ziggy-js';
import { APP_URL } from '@/config-global';
import { routes } from '@/routes';
import { usePage, router } from '@inertiajs/react';
import { useLocales } from '@/locales';

const ProfileDropdown = () => {
  const { t } = useLocales();

  const { auth } = usePage().props;
  const { user } = auth;

  const popover = usePopover();

  const handleLogout = () => {
    router.get(route(routes.auth.logout));
  };

  const handleClickItem = (path) => {
    popover.onClose();
    route(path);
  };

  return (
    <>
      <IconButton
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.photoURL || `${APP_URL}/assets/images/avatar.jpg`}
          alt={user?.email}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.full_name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 1, textTransform: 'capitalize' }}>
          <MenuItem sx={{ px: 1 }} onClick={() => handleClickItem('/')}>
            <Typography variant="body2">{t('home')}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ px: 1 }}
            onClick={() => handleClickItem(routes.dashboard.overview.index)}
          >
            <Typography variant="body2">{t('dashboard')}</Typography>
          </MenuItem>
          <MenuItem
            sx={{ px: 1 }}
            onClick={() => handleClickItem(routes.auth.logout)}
          >
            <Typography variant="body2">{t('profile')}</Typography>
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={handleLogout}
          sx={{
            px: 1,
            m: 1,
            fontWeight: 'fontWeightBold',
            color: 'error.main',
            textTransform: 'capitalize',
          }}
        >
          <Typography variant="body2">{t('logout')}</Typography>
        </MenuItem>
      </CustomPopover>
    </>
  );
};

ProfileDropdown.propTypes = {
  user: PropTypes.object,
};

export default ProfileDropdown;
