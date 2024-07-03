import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link } from '@inertiajs/react';

const RouterLink = forwardRef(function RouterLink({ href, ...other }, ref) {
  return <Link ref={ref} href={href} {...other} />;
});

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;
