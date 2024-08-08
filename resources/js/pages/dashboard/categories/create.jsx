import React from 'react';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { DashboardLayout } from '@/layouts';
import { Head } from '@inertiajs/react';
import { APP_NAME } from '@/config-global';
import { Container } from '@mui/material';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { routes } from '@/routes';
import CategoryCreateEditForm from '@/pages/sections/categories/category-create-edit-form';

export default function CategoryCreate() {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Category Create | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Create Category')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Category List'),
              href: routes.dashboard.categories.index,
            },
            {
              name: t('Create Category'),
              href: routes.dashboard.categories.create,
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <CategoryCreateEditForm />
      </Container>
    </DashboardLayout>
  );
}
