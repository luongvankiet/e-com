import React from 'react';
import PropTypes from 'prop-types';
import { useLocales } from '@/locales';
import { useSettingsContext } from '@/components/settings';
import { DashboardLayout } from '@/layouts';
import { Head } from '@inertiajs/react';
import { APP_NAME } from '@/config-global';
import { Button, Container } from '@mui/material';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { routes } from '@/routes';
import RouterLink from '@/components/router-link';
import { route } from 'ziggy-js';
import { Iconify } from '@/components/icons';
import { CategoryDataTable } from '@/pages/sections/categories/category-data-table';

const CategoryList = ({
  categories,
  total,
  all_count,
  draft_count,
  published_count,
  trashed_count,
}) => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Category List | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Category List')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Category List'),
              href: routes.dashboard.categories.index,
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={route(routes.dashboard.categories.create)}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t('New Category')}
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <CategoryDataTable
          categories={categories}
          total={total}
          allCount={all_count}
          draftCount={draft_count}
          publishedCount={published_count}
          trashedCount={trashed_count}
        />
      </Container>
    </DashboardLayout>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array,
  total: PropTypes.number,
  all_count: PropTypes.number,
  draft_count: PropTypes.number,
  published_count: PropTypes.number,
  trashed_count: PropTypes.number,
};

export default CategoryList;
