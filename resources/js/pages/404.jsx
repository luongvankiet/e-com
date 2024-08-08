import React from 'react';
import { m } from 'framer-motion';
import { APP_NAME } from '@/config-global';
import ClientLayout from '@/layouts/client/client-layout';
import { useLocales } from '@/locales';
import { Head } from '@inertiajs/react';
import { MotionContainer, varBounce } from '@/components/animate';
import { Button, Container, Stack, Typography } from '@mui/material';
import { PageNotFoundIllustration } from '@/assets/illustrations';
import RouterLink from '@/components/router-link';
import { route } from 'ziggy-js';
import { routes } from '@/routes';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  const { t } = useLocales();

  return (
    <ClientLayout>
      <Head title={`404 Page Not Found! | ${APP_NAME}`} />

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
                {t('Page Not Found!')}
              </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
              <Typography sx={{ color: 'text.secondary' }}>
                {t(
                  'Sorry, we couldn&apos;t find the page you&apos;re looking for.'
                )}
              </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
              <PageNotFoundIllustration
                sx={{
                  height: 260,
                  my: { xs: 5, sm: 10 },
                }}
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
