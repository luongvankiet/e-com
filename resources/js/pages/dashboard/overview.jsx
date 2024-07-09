import React from 'react';
import PropTypes from 'prop-types';
import { DashboardLayout } from '@/layouts';

const overview = ({ auth, currentRouteName }) => {
  return (
    <DashboardLayout auth={auth} currentRouteName={currentRouteName}>
      <>Overview</>
    </DashboardLayout>
  );
};

overview.propTypes = {
  auth: PropTypes.object,
  currentRouteName: PropTypes.string,
};

export default overview;
