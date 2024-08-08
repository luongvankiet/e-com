import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
  Container,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Iconify } from '@/components/icons';
import { useSettingsContext } from '@/components/settings';
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs';
import { Head } from '@inertiajs/react';
import RouterLink from '@/components/router-link';
import { DashboardLayout } from '@/layouts';
import { route } from 'ziggy-js';
import { routes } from '@/routes';
import { useSettingsData } from './config-navigation';
import { useLocales } from '@/locales';

const Settings = () => {
  const { t } = useLocales();

  const settings = useSettingsContext();

  const settingsData = useSettingsData();

  return (
    <DashboardLayout>
      <Head title="Profile" />

      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('Settings')}
          links={[
            { name: t('Dashboard'), href: routes.dashboard.overview.index },
            { name: t('Settings') },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Grid container spacing={2}>
          {settingsData.map((item, key) => (
            <Grid xs={12} md={4} lg={3} key={key}>
              <Link
                component={RouterLink}
                href={route(item.path)}
                sx={{ color: 'white' }}
              >
                <SettingCard
                  key={item.title}
                  name={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default Settings;

const SettingCard = ({ name, description, icon }) => (
  <Card
    sx={{
      width: 1,
      borderRadius: 1.5,
      textTransform: 'capitalize',
    }}
  >
    <CardContent>
      <Stack direction="row" spacing={2}>
        <Avatar sx={{ width: 50, height: 50 }}>
          <Iconify icon={icon} width={34} sx={{ color: 'grey' }} />
        </Avatar>

        <Box>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>

          <Typography
            variant="caption"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {description}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

SettingCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
};
