import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { APP_NAME } from '@/config-global';
import { DashboardLayout } from '@/layouts';
import { useLocales } from '@/locales';
import { ProductForm } from '@/pages/sections/products/product-form';
import { routes } from '@/routes';
import { Head } from '@inertiajs/react';
import { Container } from '@mui/material';
import React from 'react';

export default function ProductCreate() {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Product Create | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Create Product')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Product List'),
              href: routes.dashboard.products.index,
            },
            {
              name: t('Create Product'),
              href: routes.dashboard.products.create,
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <ProductForm />
      </Container>
    </DashboardLayout>
  );
}
