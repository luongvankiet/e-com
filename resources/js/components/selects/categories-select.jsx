import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { usePage } from '@inertiajs/react';
import { useLocales } from '@/locales';

const CategoriesSelect = ({ value, onChange, multiple = false }) => {
  const { t } = useLocales();

  const { categories } = usePage().props;

  if (multiple) {
    return (
      <Autocomplete
        fullWidth
        multiple
        disableCloseOnSelect
        limitTags={5}
        options={categories}
        value={value}
        getOptionLabel={(option) => option.name || ''}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} label={t('Categories')} />
        )}
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
      options={categories}
      value={value}
      getOptionLabel={(option) => option.name || ''}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={t('Category')} />}
    />
  );
};

CategoriesSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
};

export default CategoriesSelect;
