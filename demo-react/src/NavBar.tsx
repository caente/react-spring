import React from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

const NavBar: React.FunctionComponent = () => {

  const [state, setState] = React.useState({isOpen: false});

  function toggle() {
    setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  return <Navbar color="light" light expand="md">
    <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={state.isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink
            href="https://twitter.com/oktadev">@oktadev</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/oktadeveloper/okta-kotlin-react-crud-example">GitHub</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>;
}

export default NavBar;
