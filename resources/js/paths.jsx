import { ICONS } from '@/components/icons';

const paths = {
  auth: {
    login: {
      route: 'login',
    },
    register: {
      route: 'register',
    },
    logout: {
      route: 'logout',
    },
  },
  dashboard: {
    overview: {
      route: 'overview',
      icon: ICONS.analytics,
    },
  },
};

export default paths;
