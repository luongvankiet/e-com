import { Box, Drawer, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import Logo from '@/components/logo';
import { NAV, SidebarConfig } from '@/layouts/config-layout';
import Scrollbar from '@/components/scrollbar';
import { usePage } from '@inertiajs/react';
import { useNavData } from '../../config-navigation';
import SidebarGroup from './sidebar-group';

const Sidebar = ({ openNav, onCloseNav }) => {
  const lgUp = useResponsive('up', 'lg');
  const { current_route_name } = usePage().props;

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [current_route_name]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        mb: 3,
      }}
    >
      <Box sx={{ mt: 3, mb: 2 }}>
        <Logo sx={{ ml: 3 }} />
      </Box>

      {navData.map((group, index) => (
        <SidebarGroup
          key={group.subheader || index}
          subheader={group.subheader}
          items={group.items}
          config={SidebarConfig(group.config)}
        />
      ))}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

Sidebar.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default Sidebar;
