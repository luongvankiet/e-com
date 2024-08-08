import { useOffSetTop } from '@/hooks/use-off-set-top';
import { useResponsive } from '@/hooks/use-responsive';
import { HEADER } from '@/layouts/config-layout';
import { bgBlur } from '@/theme/css';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';
import React from 'react';
import Logo from '@/components/logo';
import NavDesktop from './desktop/nav-desktop';
import { navConfig } from '../config-navigation';
import RouterLink from '@/components/router-link';
import SettingsButton from '@/layouts/components/settings-button';
import { routes } from '@/routes';
import NavMobile from './mobile/nav-mobile';
import { usePage } from '@inertiajs/react';
import { ProfileDropdown } from '@/layouts/dashboard/partials';

const Header = () => {
  const { auth } = usePage().props;
  const { user } = auth;

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} data={navConfig} />}

          <Stack
            alignItems="center"
            direction={{ xs: 'row', md: 'row-reverse' }}
          >
            {!user ? (
              <Button
                component={RouterLink}
                href={routes.auth.login}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Login
              </Button>
            ) : (
              <ProfileDropdown />
            )}

            <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            />

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {/* {offsetTop && <HeaderShadow />} */}
    </AppBar>
  );
};

export default Header;
