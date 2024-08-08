import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Header, Main, Sidebar } from './partials';
import { AppProvider } from '@/contexts/app/app-provider';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppProvider>
      <Header onOpenNav={() => setIsOpen(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Sidebar openNav={isOpen} onCloseNav={() => setIsOpen(false)} />
        <Main>{children}</Main>
      </Box>
    </AppProvider>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
