import React from "react";
import { NavLink } from 'react-router-dom';
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';

const AdminNav = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
      <div>
        <NavLink
          to="/admin"
          className="NavBar-link AdminNav"
          ref={anchorRef}
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onMouseOver={handleToggle}
        >
          Admin
        </NavLink>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/admin/users" className="AdminNav-menu">Users</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/admin/transactions" className="AdminNav-menu">Transactions</NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink to="/admin/items" className="AdminNav-menu">Items</NavLink>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
};

export default AdminNav;