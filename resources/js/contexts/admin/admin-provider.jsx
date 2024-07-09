import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AdminContext } from './admin-context';
import { usePage } from '@inertiajs/react';

// ----------------------------------------------------------------------

export function AdminProvider({ children }) {
  const { auth } = usePage().props;

  const { user } = auth;
  
  // const isSuperAdmin = useCallback(() => {
  //   if (!state.user || !state.user.role) {
  //     return false;
  //   }
  //   return state.user.role.name === 'super_admin';
  // }, [state.user]);

  // const hasPermissions = useCallback(
  //   (permissions) => {
  //     if (isSuperAdmin()) return true; // Super admin has all permissions

  //     if (!state.user || !state.user.role) {
  //       return false;
  //     }

  //     const userPermissions = new Set(
  //       state.user.role.permissions.map((perm) => perm.name)
  //     );

  //     if (typeof permissions === 'string')
  //       return userPermissions.has(permissions);

  //     if (typeof permissions === 'object') {
  //       return permissions.every((perm) => userPermissions.has(perm));
  //     }
  //     return false;
  //   },
  //   [isSuperAdmin, state]
  // );

  const memoizedValue = useMemo(() => {}, []);

  return (
    <AdminContext.Provider value={memoizedValue}>
      {children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.node,
};
