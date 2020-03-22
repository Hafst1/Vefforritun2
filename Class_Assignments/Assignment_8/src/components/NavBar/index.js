import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'shards-react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <Navbar type="dark" theme="primary" expand="md">
    <NavbarBrand href="/">TV Station</NavbarBrand>
    <Nav navbar>
      <NavItem>
        <NavLink to="/tv-station">TV Station</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="signup-form">Sign up!</NavLink>
      </NavItem>
    </Nav>
  </Navbar>
)

export default NavBar;
