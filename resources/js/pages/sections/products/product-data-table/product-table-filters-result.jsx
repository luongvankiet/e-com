import React from 'react';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// components
import { Iconify } from '@/components/icons';
import { useLocales } from '@/locales';
import { snakeToTitle } from '@/utils/string';

// ----------------------------------------------------------------------

export default function ProductTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}) {
  const { t } = useLocales();

  const handleRemoveStatus = () => {
    onFilters('status', 'all');
  };

  const handleRemoveStock = (inputValue) => {
    const newValue = filters.roles
      .split(',')
      .filter((item) => item !== inputValue)
      .join(',');
    onFilters('roles', newValue || 'all');
  };

  const handleRemoveSearchTerm = () => {
    onFilters('search', null);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
          {t('results found')}
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
      >
        {filters.search && (
          <Block label={t('Search')}>
            <Chip
              size="small"
              label={filters.search}
              onDelete={handleRemoveSearchTerm}
            />
          </Block>
        )}

        {filters.status !== 'all' && (
          <Block label={t('Status')}>
            <Chip
              size="small"
              label={t(filters.status)}
              onDelete={handleRemoveStatus}
            />
          </Block>
        )}

        {!!filters.stock?.length && filters.roles && (
          <Block label="Stock:">
            {filters.stock.split(',').map((item) => (
              <Chip
                key={item}
                label={t(snakeToTitle(item))}
                size="small"
                onDelete={() => handleRemoveStock(item)}
              />
            ))}
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

ProductTableFiltersResult.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  results: PropTypes.number,
};

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
