import { useMemo } from 'react';
import { ICONS } from '@/components/icons';
import { routes } from '@/routes';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('overview'),
            path: routes.dashboard.overview.index,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // USER
          {
            title: t('users'),
            path: routes.dashboard.settings.users.index,
            icon: ICONS.user,
            children: [
              { title: t('list'), path: routes.dashboard.settings.users.index },
              {
                title: t('create'),
                path: routes.dashboard.settings.users.create,
              },
            ],
          },
        ],
      },
      {
        subheader: t('settings'),
        items: [
          // USER
          {
            title: t('settings'),
            path: routes.dashboard.settings.index,
            icon: ICONS.settings,
            children: [
              {
                title: t('accounts'),
                path: routes.dashboard.settings.users.index,
              },
              {
                title: t('roles'),
                path: routes.dashboard.settings.roles.index,
              },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
