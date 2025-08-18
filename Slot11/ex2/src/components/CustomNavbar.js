import React from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

function CustomNavbar({ search, setSearch }) {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand>
          <i className="bi bi-mortarboard me-2"></i>
          StudentApp
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="#">
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-people me-1"></i>
              Students
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Quick Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

CustomNavbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default CustomNavbar;
