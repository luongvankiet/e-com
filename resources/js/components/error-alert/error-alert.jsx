import React from 'react';
import PropTypes from 'prop-types';
import { Alert, List, ListItem } from '@mui/material';
import { Iconify } from '../icons';

const ErrorAlert = ({ errors = {} }) => {
  return (
    !!Object.values(errors).length && (
      <Alert severity="error" icon={false}>
        <List dense>
          {Object.values(errors).map((error, key) => (
            <ListItem key={key}>
              <Iconify icon={'mdi:dot'} width={35}></Iconify>
              {error}
            </ListItem>
          ))}
        </List>
      </Alert>
    )
  );
};

ErrorAlert.propTypes = {
  errors: PropTypes.object,
};

export default ErrorAlert;
