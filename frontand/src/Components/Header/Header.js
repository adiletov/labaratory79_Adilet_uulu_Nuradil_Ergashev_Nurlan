import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNav} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">OFFICE TOOLS</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={RouterNav} to="/">OfficeTools</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNav} to="/add">New Tools</NavLink>
                        </NavItem>
                    </Nav>
            </Navbar>
        </div>
    );
};

export default Header;