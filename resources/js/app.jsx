import './bootstrap';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';
import '@fontsource/public-sans/800.css';

import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow/800.css';

import '@/locales/i18n';

// ----------------------------------------------------------------------

import React from 'react';
import { MotionLazy } from '@/components/animate/motion-lazy';
import { ProgressBar } from '@/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from '@/components/settings';
import { SnackbarProvider } from '@/components/snackbar';
import ThemeProvider from '@/theme';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { LocalizationProvider } from './locales';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.jsx`,
      import.meta.glob('./pages/**/*.jsx')
    ),

  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                {/* <CheckoutProvider> */}
                <SettingsDrawer />
                <ProgressBar />
                <App {...props} />
                {/* </CheckoutProvider> */}
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
