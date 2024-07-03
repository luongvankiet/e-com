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
import { ASSETS_URL } from '@/config-global';
import paths from '@/paths';
import CustomPopover, { usePopover } from '@/components/custom-popover';
import { route } from 'ziggy-js';

ProfileDropdown.propTypes = {
  user: PropTypes.object,
};

const ProfileDropdown = ({ user }) => {
  const popover = usePopover();

  const handleLogout = () => {
    route(paths.auth.logout.route);
  };
  const handleClickItem = (path) => {
    popover.onClose();
    // router.push(path);
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
          src={user?.photoURL || `${ASSETS_URL}/assets/images/avatar.jpg`}
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
            {user?.first_name} {user?.last_name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 1 }}>
          <MenuItem sx={{ px: 1 }} onClick={() => handleClickItem('/')}>
            <Typography variant="body2">Home</Typography>
          </MenuItem>
          <MenuItem
            sx={{ px: 1 }}
            onClick={() => handleClickItem(paths.dashboard.root)}
          >
            <Typography variant="body2">Dashboard</Typography>
          </MenuItem>
          <MenuItem sx={{ px: 1 }} onClick={() => handleClickItem('/profile')}>
            <Typography variant="body2">Profile</Typography>
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
          }}
        >
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </CustomPopover>
    </>
  );
};
export default ProfileDropdown;
