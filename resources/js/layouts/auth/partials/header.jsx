import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useOffSetTop } from '@/hooks/use-off-set-top';
import { HEADER } from '@/layouts/config-layout';
import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { bgBlur } from '@/theme/css';
import Logo from '@/components/logo';
import LanguagePopover from '@/layouts/components/language-popover';

const Header = () => {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
  <AppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
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
        <Logo />

        <Stack direction="row" alignItems="center" spacing={1}>
          {/* <SettingsButton /> */}
          <LanguagePopover />
        </Stack>
      </Toolbar>

      {offsetTop && (
        <Box
          sx={{
            left: 0,
            right: 0,
            bottom: 0,
            m: 'auto',
            height: 24,
            zIndex: -1,
            opacity: 0.48,
            borderRadius: '50%',
            position: 'absolute',
            width: `calc(100% - 48px)`,
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        />
      )}
    </AppBar>
  );
};

export default Header;
