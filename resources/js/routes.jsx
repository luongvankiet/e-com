export const routes = {
  auth: {
    login: 'login',
    register: 'register',
    logout: 'logout',
    forgotPassword: 'password.request',
    confirmPassword: 'password.confirm',
  },
  dashboard: {
    index: 'dashboard',
    overview: {
      index: 'dashboard',
    },
    settings: {
      index: 'settings',
      users: {
        index: 'settings.users.index',
        create: 'settings.users.create',
        store: 'settings.users.store',
        edit: 'settings.users.edit',
        update: 'settings.users.update',
        delete: 'settings.users.delete',
      },
      roles: {
        index: 'settings.roles.index',
        create: 'settings.roles.create',
        store: 'settings.roles.store',
        edit: 'settings.roles.edit',
        update: 'settings.roles.update',
        delete: 'settings.roles.delete',
      },
    },
  },
};
