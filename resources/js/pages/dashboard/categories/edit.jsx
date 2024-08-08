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
import CategoryCreateEditForm from '@/pages/sections/categories/category-create-edit-form';

const CategoryEdit = ({ category }) => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Category Edit | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Edit Category')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Category List'),
              href: routes.dashboard.categories.index,
            },
            {
              name: t('Edit Category'),
              href: routes.dashboard.categories.create,
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <CategoryCreateEditForm category={category} />
      </Container>
    </DashboardLayout>
  );
};

CategoryEdit.propTypes = {
  category: PropTypes.object,
};

export default CategoryEdit;
