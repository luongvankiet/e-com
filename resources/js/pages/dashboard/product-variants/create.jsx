import React from 'react';
import PropTypes from 'prop-types';
import { useLocales } from '@/locales';
import { useSettingsContext } from '@/components/settings';
import { routes } from '@/routes';
import { Container } from '@mui/material';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { DashboardLayout } from '@/layouts';
import { Head } from '@inertiajs/react';
import { APP_NAME } from '@/config-global';
import { ProductVariantForm } from '@/pages/sections/product-variants/product-variant-form';

const ProductVariantCreate = ({ product }) => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Product Variant Create | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Create Variant')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Product List'),
              href: routes.dashboard.products.index,
            },
            {
              name: t('Product'),
            },
            {
              name: t('Create Variant'),
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <ProductVariantForm product={product} />
      </Container>
    </DashboardLayout>
  );
};

ProductVariantCreate.propTypes = {
  product: PropTypes.object,
};

export default ProductVariantCreate;
