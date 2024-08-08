import { m } from 'framer-motion';
import React from 'react';
import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// assets
import { ForbiddenIllustration } from '@/assets/illustrations';
// components
import { MotionContainer, varBounce } from '@/components/animate';
import { useLocales } from '@/locales';
import { useAppContext } from './app/app-context';

// ----------------------------------------------------------------------

export default function PermissionBasedGuard({
  children,
  permissions,
  onlySuperAdmin,
  sx,
}) {
  const { t } = useLocales();
  // Logic here to get current user role
  const { hasPermissions, isSuperAdmin } = useAppContext();

  if (
    (onlySuperAdmin && isSuperAdmin()) ||
    (typeof permissions !== 'undefined' &&
      !!permissions.length &&
      !hasPermissions(permissions))
  ) {
    return (
      <Container
        component={MotionContainer}
        sx={{ m: 'auto', textAlign: 'center', ...sx }}
      >
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {t('Permission Denied')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('You do not have permission to access this page.')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    );
  }

  return <>{children}</>;
}

PermissionBasedGuard.propTypes = {
  children: PropTypes.node,
  permissions: PropTypes.arrayOf(PropTypes.string),
  onlySuperAdmin: PropTypes.bool,
  sx: PropTypes.object,
};
