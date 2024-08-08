import React from 'react';
import { Iconify } from '@/components/icons';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useLocales } from '@/locales';
import { useBoolean } from '@/hooks/use-boolean';
import ProductVariantQuickCreateForm from './product-variant-quick-create-form';

export default function ProductVariantTableToolbar({
  filters,
  onFilters,
}) {
  const { t } = useLocales();

  const quickAddVariant = useBoolean();

  const handleFilterSearch = useCallback(
    (event) => {
      onFilters('search', event.target.value || null);
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          flexGrow={1}
          sx={{ width: 1 }}
        >
          <TextField
            fullWidth
            value={filters.search || ''}
            onChange={handleFilterSearch}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled' }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="soft"
            onClick={quickAddVariant.onTrue}
            sx={{ whiteSpace: 'nowrap', px: 3, py: 1 }}
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t('Add Variant')}
          </Button>
        </Stack>
      </Stack>

      <ProductVariantQuickCreateForm
        open={quickAddVariant.value}
        onClose={quickAddVariant.onFalse}
      />
    </>
  );
}

ProductVariantTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
};
