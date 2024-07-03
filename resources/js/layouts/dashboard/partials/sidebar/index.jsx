import { Box, Drawer, List, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Scrollbar } from '@/components/scrollbar';
import { useResponsive } from '@/hooks/use-responsive';
import Logo from 'src/components/logo';
import paths from '@/paths';
import { NAV } from '@/layouts/config-layout';
import SidebarConfig from './sidebar-config';
import SidebarList from './sidebar-list';

const Sidebar = ({ openNav, onCloseNav }) => {
  const lgUp = useResponsive('up', 'lg');

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   if (openNav) {
  //     onCloseNav();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

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

      {/* <List disablePadding sx={{ px: 2 }}>
        {paths.dashboard.map((item, index) => (
          <SidebarList
            key={item.route + index}
            item={item}
            depth={1}
            config={SidebarConfig(item.config)}
            // routeName={currentRouteName}
          />
        ))}
      </List> */}
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
