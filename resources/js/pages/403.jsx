import React from 'react';
import { m } from 'framer-motion';
import { APP_NAME } from '@/config-global';
import ClientLayout from '@/layouts/client/client-layout';
import { Head } from '@inertiajs/react';
import { MotionContainer, varBounce } from '@/components/animate';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useLocales } from '@/locales';
import { ForbiddenIllustration } from '@/assets/illustrations';
import RouterLink from '@/components/router-link';
import { route } from 'ziggy-js';
import { routes } from '@/routes';

export default function Page403() {
  const { t } = useLocales();

  return (
    <ClientLayout>
      <Head title={`403 Forbidden | ${APP_NAME}`} />

      <Container component="main">
        <Stack
          sx={{
            m: 'auto',
            maxWidth: 400,
            minHeight: '75vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <MotionContainer>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {t('Permission Denied')}
              </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
              <Typography sx={{ color: 'text.secondary' }}>
                {t('You do not have permission to access this page.')}
              </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
              <ForbiddenIllustration
                sx={{ height: 260, my: { xs: 5, sm: 10 } }}
              />
            </m.div>

            <Button
              component={RouterLink}
              href={route(routes.client.index)}
              size="large"
              variant="contained"
            >
              {t('Home')}
            </Button>
          </MotionContainer>
        </Stack>
      </Container>
    </ClientLayout>
  );
}
