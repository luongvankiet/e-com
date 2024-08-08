import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from './app-context';
import { usePage } from '@inertiajs/react';

// ----------------------------------------------------------------------

export function AppProvider({ children }) {
  const { auth } = usePage().props;

  const { user } = auth;

  const isSuperAdmin = useCallback(() => {
    if (!user) {
      return false;
    }
    return user.roles?.some((role) => role.name === 'super_admin');
  }, [user]);

  const hasPermissions = useCallback(
    (permissions) => {
      if (!user) {
        return false;
      }

      if (isSuperAdmin()) return true; // Super admin has all permissions

      if (typeof permissions === 'string')
        return user.all_permissions.includes(permissions);

      if (typeof permissions === 'object') {
        return permissions.every((permission) =>
          user.all_permissions?.includes(permission)
        );
      }

      return false;
    },
    [isSuperAdmin, user]
  );

  const memoizedValue = useMemo(
    () => ({
      isSuperAdmin,
      hasPermissions,
    }),
    [isSuperAdmin, hasPermissions]
  );

  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};
