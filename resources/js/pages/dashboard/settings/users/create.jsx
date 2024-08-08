import React from 'react';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { APP_NAME } from '@/config-global';
import { DashboardLayout } from '@/layouts';
import { useLocales } from '@/locales';
import { routes } from '@/routes';
import { Head } from '@inertiajs/react';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import UserCreateEditForm from '@/pages/sections/users/user-create-edit-form';

const UserCreate = ({ roles }) => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Head title={`Account Create | ${APP_NAME}`} />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Create Account')}
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
            {
              name: t('Create Account'),
              href: routes.dashboard.settings.users.create,
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <UserCreateEditForm roles={roles} />
      </Container>
    </DashboardLayout>
  );
};

UserCreate.propTypes = {
  user: PropTypes.object,
  roles: PropTypes.array,
};

export default UserCreate;
