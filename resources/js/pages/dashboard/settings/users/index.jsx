import React from 'react';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { Iconify } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useSettingsContext } from '@/components/settings';
import { DashboardLayout } from '@/layouts';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { UserDataTable } from '@/pages/sections/users/user-data-table';
import { Button, Container } from '@mui/material';
import PropTypes from 'prop-types';
import { route } from 'ziggy-js';
import { Head } from '@inertiajs/react';
import { APP_NAME } from '@/config-global';

const UserList = ({
  users,
  roles,
  total,
  all_count,
  verified_count,
  trashed_count,
  pending_count,
}) => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`User List | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Account List')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            {
              name: t('Settings'),
              href: routes.dashboard.settings.index,
            },
            {
              name: t('Account List'),
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
              {t('New Account')}
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <UserDataTable
          users={users}
          roles={roles}
          total={total}
          allCount={all_count}
          pendingCount={pending_count}
          verifiedCount={verified_count}
          trashedCount={trashed_count}
        />
      </Container>
    </DashboardLayout>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  roles: PropTypes.array,
  total: PropTypes.number,
  all_count: PropTypes.number,
  verified_count: PropTypes.number,
  trashed_count: PropTypes.number,
  pending_count: PropTypes.number,
};

export default UserList;
