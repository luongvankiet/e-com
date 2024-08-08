import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Header from './partials/header';
import { AppProvider } from '@/contexts/app/app-provider';
import Footer from './partials/footer';
import { usePage } from '@inertiajs/react';
import { routes } from '@/routes';

const ClientLayout = ({ children }) => {
  const { current_route_name } = usePage().props;

  const isHome = current_route_name === routes.client.index;

  return (
    <AppProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Header />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ...(!isHome && {
              pt: { xs: 8, md: 10 },
            }),
          }}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </AppProvider>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node,
};

export default ClientLayout;
