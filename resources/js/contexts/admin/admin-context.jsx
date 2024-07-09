import { createContext, useContext } from 'react';

// ----------------------------------------------------------------------

export const AdminContext = createContext({});

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context)
    throw new Error('useAdminContext must be use inside AppProvider');

  return context;
};
