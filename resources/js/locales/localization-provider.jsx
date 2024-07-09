import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//
import useLocales from './use-locales';
import { router } from '@inertiajs/react';

// ----------------------------------------------------------------------

export default function LocalizationProvider({ children }) {
  const { currentLang } = useLocales();

  useEffect(() => {
    router.visit(`/locale/${currentLang.value}`, { method: 'get' });
  }, [currentLang]);

  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={currentLang.adapterLocale}
    >
      {children}
    </MuiLocalizationProvider>
  );
}

LocalizationProvider.propTypes = {
  children: PropTypes.node,
};
