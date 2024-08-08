import React from 'react';
import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fData } from '@/utils/format-number';
//
import { Iconify } from '../icons';
import { varFade } from '../animate';
import FileThumbnail, { fileData } from '../file-thumbnail';

// ----------------------------------------------------------------------

export default function MultiFilePreview({
  thumbnail,
  files,
  onRemove,
  selectedFile,
  onClickThumbnail,
  sx,
}) {
  return (
    <AnimatePresence initial={false}>
      {files?.map((file) => {
        const { id = '', key, name = '', size = 0 } = fileData(file);

        const isNotFormatFile = typeof file === 'string';

        if (thumbnail) {
          return (
            <Stack
              key={`${key}-${name}-${id}`}
              component={m.div}
              {...varFade().inUp}
              alignItems="center"
              display="inline-flex"
              justifyContent="center"
              sx={{
                m: 0.5,
                width: 80,
                height: 80,
                borderRadius: 1.25,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                border: (theme) =>
                  `solid ${
                    selectedFile?.id === id
                      ? '2px' + theme.palette.primary.main
                      : '1px' + alpha(theme.palette.grey[500], 0.16)
                  }`,
                ...sx,
              }}
            >
              <FileThumbnail
                tooltip
                imageView
                file={file}
                sx={{ position: 'absolute' }}
                imgSx={{ position: 'absolute' }}
                onClick={() => onClickThumbnail(file)}
              />

              {onRemove && (
                <IconButton
                  size="small"
                  onClick={() => onRemove(file)}
                  sx={{
                    p: 0.5,
                    top: 4,
                    right: 4,
                    position: 'absolute',
                    color: 'common.white',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    },
                  }}
                >
                  <Iconify icon="mingcute:close-line" width={14} />
                </IconButton>
              )}
            </Stack>
          );
        }

        return (
          <Stack
            key={`${key}-${name}-${id}`}
            component={m.div}
            {...varFade().inUp}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              my: 1,
              py: 1,
              px: 1.5,
              borderRadius: 1,
              cursor: 'pointer',
              border: (theme) =>
                `solid ${
                  selectedFile?.id === id
                    ? '2px' + theme.palette.primary.main
                    : '1px' + alpha(theme.palette.grey[500], 0.16)
                }`,
              ...sx,
            }}
          >
            <FileThumbnail file={file} onClick={() => onClickThumbnail(file)} />

            <ListItemText
              primary={isNotFormatFile ? file : name}
              secondary={isNotFormatFile ? '' : fData(size)}
              secondaryTypographyProps={{
                component: 'span',
                typography: 'caption',
              }}
              onClick={() => onClickThumbnail(file)}
            />

            {onRemove && (
              <IconButton size="small" onClick={() => onRemove(file)}>
                <Iconify icon="mingcute:close-line" width={16} />
              </IconButton>
            )}
          </Stack>
        );
      })}
    </AnimatePresence>
  );
}

MultiFilePreview.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
  selectedFile: PropTypes.object,
  onClickThumbnail: PropTypes.func,
  sx: PropTypes.object,
  thumbnail: PropTypes.bool,
};
