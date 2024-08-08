import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { Iconify } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useSettingsContext } from '@/components/settings';
import { APP_NAME } from '@/config-global';
import { DashboardLayout } from '@/layouts';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { ProductDataTable } from '@/pages/sections/products/product-data-table';
import { Head } from '@inertiajs/react';
import { Button, Container } from '@mui/material';
import React from 'react';
import { route } from 'ziggy-js';

export default function ProductList() {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Product List | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Product List')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Product List'),
              href: routes.dashboard.products.index,
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={route(routes.dashboard.products.create)}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t('New Product')}
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <ProductDataTable />
      </Container>
    </DashboardLayout>
  );
}
