import React from 'react';
import PropTypes from 'prop-types'; // @mui
import { Box, Link, ListItemText, Tooltip } from '@mui/material';
import RouterLink from '@/components/router-link';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import { StyledDotIcon, StyledIcon, StyledItem } from './styles';
import { route } from 'ziggy-js';

const SidebarItem = ({
  item,
  depth,
  active,
  config,
  open,
  externalLink,
  ...other
}) => {
  const { title, icon, info, children, disabled, caption, hidden, path } = item;
  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem
      disableGutters
      disabled={disabled}
      active={active}
      depth={depth}
      config={config}
      {...other}
    >
      <>
        {!subItem && icon && (
          <StyledIcon size={config?.iconSize}>{icon}</StyledIcon>
        )}

        {subItem && (
          <StyledIcon size={config?.iconSize}>
            <StyledDotIcon active={active} />
          </StyledIcon>
        )}
      </>

      {!(config?.hiddenLabel && !subItem) && (
        <ListItemText
          primary={title}
          secondary={
            caption ? (
              <Tooltip title={caption} placement="top-start">
                <span>{caption}</span>
              </Tooltip>
            ) : null
          }
          primaryTypographyProps={{
            noWrap: true,
            typography: 'body2',
            textTransform: 'capitalize',
            fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
          }}
          secondaryTypographyProps={{
            noWrap: true,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />
      )}

      {info && (
        <Box component="span" sx={{ ml: 1, lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {
        !!children &&
          children?.filter((i) => !i.hidden).length > 0 &&
          (open ? <KeyboardArrowDownRounded /> : <KeyboardArrowRightRounded />)
        // <Iconify
        //   width={16}
        //   icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
        //   sx={{ ml: 1, flexShrink: 0 }}
        // />
      }
    </StyledItem>
  );

  if (hidden) {
    return null;
  }

  if (externalLink)
    return (
      <Link
        href={path}
        target="_blank"
        rel="noopener"
        underline="none"
        color="inherit"
        sx={{
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );

  return (
    <Link
      component={RouterLink}
      href={route(path)}
      underline="none"
      color="inherit"
      sx={{
        ...(disabled && {
          cursor: 'default',
        }),
      }}
    >
      {renderContent}
    </Link>
  );
};

SidebarItem.propTypes = {
  item: PropTypes.object,
  depth: PropTypes.number,
  active: PropTypes.bool,
  config: PropTypes.object,
  open: PropTypes.bool,
  externalLink: PropTypes.bool,
};

export default SidebarItem;
