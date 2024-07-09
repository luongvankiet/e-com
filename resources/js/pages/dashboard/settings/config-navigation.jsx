import { useMemo } from 'react';
import { routes } from '@/routes';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export function useSettingsData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        title: t('roles'),
        path: routes.dashboard.settings.roles.index,
        description: t('assign user roles and permissions'),
        icon: 'material-symbols:manage-accounts',
      },
      {
        title: t('accounts'),
        path: routes.dashboard.settings.users.index,
        description: t('manage accounts and permissions'),
        icon: 'mdi:users',
      },
    ],
    [t]
  );

  return data;
}
