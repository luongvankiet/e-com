import React from 'react';
import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useLocales } from '@/locales';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  const { t } = useLocales();

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title || t('Confirm')}</DialogTitle>

      <DialogContent sx={{ typography: 'body2' }}>
        {content || t('Are you sure want to perform this action?')}
      </DialogContent>

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          {t('Cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
