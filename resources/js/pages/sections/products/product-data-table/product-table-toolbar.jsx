import React from 'react';
import { Iconify } from '@/components/icons';
import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

export default function ProductTableToolbar({
  filters,
  onFilters,
  stockOptions,
}) {
  const handleFilterSearch = useCallback(
    (event) => {
      onFilters('search', event.target.value || null);
    },
    [onFilters]
  );

  const handleFilterStock = useCallback(
    (event) => {
      onFilters(
        'stock',
        event.target.value.length > 0
          ? event.target.value
              .filter((item) => !!item && item !== 'all')
              .join(',')
          : 'all'
      );
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
        sx={{
          p: 2.5,
          // pr: { xs: 2.5, md: 1 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          flexGrow={1}
          sx={{ width: 1 }}
        >
          {!!stockOptions?.length && (
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <InputLabel>Stock</InputLabel>

              <Select
                multiple
                value={filters.stock?.split(',') || []}
                onChange={handleFilterStock}
                input={<OutlinedInput label="Stock" />}
                renderValue={(selected) =>
                  stockOptions
                    .filter((option) => selected.includes(option.value))
                    .map((option) => option.label)
                    .join(', ')
                }
                sx={{ textTransform: 'capitalize' }}
              >
                {stockOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Checkbox
                      disableRipple
                      size="small"
                      checked={filters.stock?.includes(option.value) || false}
                    />
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

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

          {/* <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        </Stack>
      </Stack>

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover> */}
    </>
  );
}

ProductTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  stockOptions: PropTypes.array,
};
