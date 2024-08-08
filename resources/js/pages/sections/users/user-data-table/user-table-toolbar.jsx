import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import React, { useCallback } from 'react';
import { snakeToTitle } from '@/utils/string';
import { Iconify } from '@/components/icons';
import { useLocales } from '@/locales';

export default function UserTableToolbar({
  filters,
  onFilters,
  //
  roleOptions,
}) {
  const { t } = useLocales();

  const handleFilterName = useCallback(
    (event) => {
      onFilters('search', event.target.value || null);
    },
    [onFilters]
  );

  const handleFilterRole = useCallback(
    (event) => {
      onFilters(
        'roles',
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
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>{t('Role')}</InputLabel>

          <Select
            multiple
            value={filters.roles.split(',')}
            onChange={handleFilterRole}
            input={<OutlinedInput label={t('Role')} />}
            renderValue={(selected) =>
              selected.map((value) => snakeToTitle(value)).join(', ')
            }
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {roleOptions.map((option) => (
              <MenuItem key={`role-${option.id}`} value={option.name}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={
                    !!filters.roles
                      .split(',')
                      .find((role) => role === option.name)
                  }
                />
                {option.display_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            onChange={handleFilterName}
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

UserTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  roleOptions: PropTypes.array,
};
