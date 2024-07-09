import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SidebarList from './sidebar-list';
import { Collapse, List } from '@mui/material';
import { StyledSubheader } from './styles';

const SidebarGroup = ({ subheader, items = [], config }) => {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((list) => (
    <SidebarList
      key={list.title + list.route}
      item={list}
      depth={1}
      config={config}
    />
  ));

  return (
    <List disablePadding sx={{ px: 2 }}>
      {subheader ? (
        <>
          <StyledSubheader
            disableGutters
            disableSticky
            onClick={handleToggle}
            config={config}
          >
            {subheader}
          </StyledSubheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        renderContent
      )}
    </List>
  );
};

SidebarGroup.propTypes = {
  subheader: PropTypes.string,
  items: PropTypes.array,
  config: PropTypes.object,
};

export default SidebarGroup;
