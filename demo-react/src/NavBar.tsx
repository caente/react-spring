import React from 'react';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
  login: () => Promise<any>;
  logout: () => Promise<any>;
}
const NavBar: React.FunctionComponent<Props> = props => {

  const [state, setState] = React.useState({isOpen: false});
  const {isAuthenticated, login, logout} = props;
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
        {!isAuthenticated ?
          <NavItem>
            <Button color="secondary" outline onClick={login}>Login</Button>
          </NavItem> :
          <NavItem>
            <Button color="secondary" outline onClick={logout}>Logout</Button>
          </NavItem>
        }
      </Nav>
    </Collapse>
  </Navbar>;
}

export default NavBar;
