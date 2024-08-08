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
import { RoleDataTable } from '@/pages/sections/roles/role-data-table';

const RoleList = ({ roles, total }) => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Role List | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Role List')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Role List'),
              href: routes.dashboard.settings.users.index,
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={route(routes.dashboard.settings.users.create)}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t('New Role')}
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <RoleDataTable roles={roles} total={total} />
      </Container>
    </DashboardLayout>
  );
};

RoleList.propTypes = {
  roles: PropTypes.array,
  total: PropTypes.number,
};

export default RoleList;
