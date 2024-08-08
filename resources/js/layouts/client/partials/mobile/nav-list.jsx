import React from 'react';
import PropTypes from 'prop-types';
// @mui
import Collapse from '@mui/material/Collapse';
import { listClasses } from '@mui/material/List';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { listItemButtonClasses } from '@mui/material/ListItemButton';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
//
import NavItem from './nav-item';
import { Stack } from '@mui/material';
import { SidebarConfig } from '@/layouts/config-layout';
import NavGroup from './nav-group';
import { usePage } from '@inertiajs/react';

// ----------------------------------------------------------------------

export default function NavList({ item }) {
  const { current_route_name } = usePage().props;

  const { path, children } = item;

  const externalLink = path.includes('http');

  const nav = useBoolean();

  return (
    <>
      <NavItem
        item={item}
        open={nav.value}
        onClick={nav.onToggle}
        active={current_route_name === path}
        externalLink={externalLink}
      />

      {!!children && (
        <Collapse in={nav.value} unmountOnExit>
          <Stack
            sx={{
              [`& .${listClasses.root}`]: {
                '&:last-of-type': {
                  [`& .${listItemButtonClasses.root}`]: {
                    height: 160,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    bgcolor: 'background.neutral',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                      'url(/assets/illustrations/illustration_dashboard.png)',
                    [`& .${listItemTextClasses.root}`]: {
                      display: 'none',
                    },
                  },
                },
              },
            }}
          >
            {children.map((group, index) => (
              <NavGroup
                key={group.subheader || index}
                subheader={group.subheader}
                items={group.items}
                config={SidebarConfig()}
              />
            ))}
          </Stack>
        </Collapse>
      )}
    </>
  );
}

NavList.propTypes = {
  item: PropTypes.object,
};
