import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function AppNavbar({ activePath }) {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav
            activeKey={activePath}
            className="ms-auto"
          >
            <Nav.Link
              as={NavLink}
              to="/"
              end
            >
              Free Movies
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/favourites"
            >
              My Favourite Movies
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/request"
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
AppNavbar.propTypes = { activePath: PropTypes.string.isRequired };
