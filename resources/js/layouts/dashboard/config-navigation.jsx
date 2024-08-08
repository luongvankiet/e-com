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
          {
            title: t('categories'),
            path: routes.dashboard.categories.index,
            icon: ICONS.menuItem,
          },
          {
            title: t('brands'),
            path: routes.dashboard.brands.index,
            icon: ICONS.label,
          },
          {
            title: t('products'),
            path: routes.dashboard.products.index,
            icon: ICONS.product,
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
                children: [
                  {
                    title: t('create'),
                    path: routes.dashboard.settings.users.create,
                    hidden: true,
                  },
                  {
                    title: t('edit'),
                    path: routes.dashboard.settings.users.edit,
                    hidden: true,
                  },
                ],
              },
              {
                title: t('roles'),
                path: routes.dashboard.settings.roles.index,
                children: [
                  {
                    title: t('create'),
                    path: routes.dashboard.settings.roles.create,
                    hidden: true,
                  },
                  {
                    title: t('edit'),
                    path: routes.dashboard.settings.roles.edit,
                    hidden: true,
                  },
                ],
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
