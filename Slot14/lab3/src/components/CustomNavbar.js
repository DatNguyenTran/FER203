import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import PropTypes from "prop-types";

function CustomNavbar({ search, setSearch, onShowProfileWizard }) {
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
          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Quick Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Button
            variant="outline-light"
            onClick={onShowProfileWizard}
            className="d-flex align-items-center"
          >
            <i className="bi bi-person-plus me-1"></i>
            Build your Profile
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

CustomNavbar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onShowProfileWizard: PropTypes.func.isRequired,
};

export default CustomNavbar;
