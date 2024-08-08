import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { usePage } from '@inertiajs/react';
import { useLocales } from '@/locales';

const BrandsSelect = ({ value, onChange, multiple = false }) => {
  const { t } = useLocales();

  const { brands } = usePage().props;

  if (multiple) {
    return (
      <Autocomplete
        fullWidth
        multiple
        disableCloseOnSelect
        limitTags={5}
        options={brands}
        value={value}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label={t('Brands')} />}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={`${option.name}-${option.id}`}>
            <Checkbox size="small" disableRipple checked={selected} />
            {option.name}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={`${option.name}-${index}`}
              label={option.name}
              size="small"
              color="success"
            />
          ))
        }
      />
    );
  }

  return (
    <Autocomplete
      fullWidth
      options={brands}
      value={value}
      getOptionLabel={(option) => option.name || ''}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={t('Brand')} />}
    />
  );
};

BrandsSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
};

export default BrandsSelect;
