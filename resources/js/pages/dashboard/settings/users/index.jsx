import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { Iconify } from '@/components/icons';
import RouterLink from '@/components/router-link';
import { useSettingsContext } from '@/components/settings';
import { DashboardLayout } from '@/layouts';
import { UserDataTable } from '@/sections/users/user-data-table';
import { Button, Container } from '@mui/material';
import { route } from 'ziggy-js';
import { routes } from '@/routes';

const UserList = ({
  auth,
  users,
  roles,
  users_count,
  total_count,
  verified_count,
  trashed_count,
  pending_count,
}) => {
  const settings = useSettingsContext();

  return (
    <DashboardLayout>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: routes.dashboard.overview.index },
            { name: 'Users', href: routes.dashboard.settings.users.index },
          ]}
          action={
            <Button
              component={RouterLink}
              href={route(routes.dashboard.settings.users.create)}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New User
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <UserDataTable
          users={users}
          roles={roles}
          usersCount={users_count}
          totalCount={total_count}
          pendingCount={pending_count}
          verifiedCount={verified_count}
          trashedCount={trashed_count}
        />
      </Container>
    </DashboardLayout>
  );
};

UserList.propTypes = {
  auth: PropTypes.object,
  users: PropTypes.array,
  roles: PropTypes.array,
  users_count: PropTypes.number,
  total_count: PropTypes.number,
  verified_count: PropTypes.number,
  trashed_count: PropTypes.number,
  pending_count: PropTypes.number,
};

export default UserList;
