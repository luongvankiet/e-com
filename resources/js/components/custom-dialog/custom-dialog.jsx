import React from 'react';
import PropTypes from 'prop-types';
import { StyledDialog } from './styles';

const CustomDialog = ({
  open,
  children,
  maxWidth = 'md',
  onClose,
  sx,
  hasErrors = false,
  ...other
}) => {
  return (
    <StyledDialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      sx={sx}
      hasErrors={hasErrors}
      {...other}
    >
      {children}
    </StyledDialog>
  );
};

CustomDialog.propTypes = {
  sx: PropTypes.object,
  open: PropTypes.bool,
  children: PropTypes.node,
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.bool,
  ]),
  onClose: PropTypes.func,
  hasErrors: PropTypes.bool,
};

export default CustomDialog;
