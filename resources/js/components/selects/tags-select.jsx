import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Checkbox, Chip, TextField } from '@mui/material';
import { usePage } from '@inertiajs/react';
import { useLocales } from '@/locales';

const TagsSelect = ({ value, onChange }) => {
  const { t } = useLocales();

  const { tags } = usePage().props;

  return (
    <Autocomplete
      fullWidth
      multiple
      freeSolo
      limitTags={5}
      options={tags?.map((tag) => tag.name) || []}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          helperText={t('Press "Enter" to apply tags')}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option}>
          <Checkbox size="small" disableRipple checked={selected} />
          {option}
        </li>
      )}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={`${option}-${index}`}
            label={option}
            size="small"
            color="success"
          />
        ))
      }
    />
  );
};

TagsSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
};

export default TagsSelect;
