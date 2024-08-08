import React from 'react';
import PropTypes from 'prop-types';
import { useSettingsContext } from '@/components/settings';
import { useLocales } from '@/locales';
import { DashboardLayout } from '@/layouts';
import { Head } from '@inertiajs/react';
import { APP_NAME } from '@/config-global';
import { Container } from '@mui/material';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { routes } from '@/routes';
import BrandCreateEditForm from '@/pages/sections/brands/brand-create-edit-form';

const BrandEdit = ({ brand }) => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Category Edit | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Edit Brand')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Brand List'),
              href: routes.dashboard.brands.index,
            },
            {
              name: t('Edit Brand'),
              href: routes.dashboard.brands.create,
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <BrandCreateEditForm brand={brand} />
      </Container>
    </DashboardLayout>
  );
};

BrandEdit.propTypes = {
  brand: PropTypes.object,
};

export default BrandEdit;
