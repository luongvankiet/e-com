import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Header, Main, Sidebar } from './partials';

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header onOpenNav={() => setIsOpen(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* <Sidebar openNav={isOpen} onCloseNav={() => setIsOpen(false)} /> */}
        <Main>{children}</Main>
      </Box>
    </>
  );
};

export default DashboardLayout;
