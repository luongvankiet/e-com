import React from 'react';
import PropTypes from 'prop-types';
import { useLocales } from '@/locales';
import { useSettingsContext } from '@/components/settings';
import { DashboardLayout } from '@/layouts';
import { Head } from '@inertiajs/react';
import { routes } from '@/routes';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { Container } from '@mui/material';
import { APP_NAME } from '@/config-global';
import { ProductForm } from '@/pages/sections/products/product-form';

export default function ProductEdit({ product }) {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Product Edit | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Edit Product')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Product List'),
              href: routes.dashboard.products.index,
            },
            {
              name: t('Edit Product'),
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <ProductForm product={product} />
      </Container>
    </DashboardLayout>
  );
}

ProductEdit.propTypes = {
  product: PropTypes.object,
};
