import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";

function Header({ favouritesCount, onShowForm, onBrowse }) {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand href="#">Healthy Recipes Finder</Navbar.Brand>

        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="mx-auto align-items-center">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#recipe-grid">Recipes</Nav.Link>

            <Button
              variant="outline-success"
              size="sm"
              onClick={onShowForm}
              style={{ marginLeft: "8px" }}
            >
              Recipe Request Form
            </Button>
          </Nav>

          <Nav className="align-items-center">
            <Nav.Link className="text-nowrap">
              ❤️ Favourites{" "}
              <Badge
                bg="dark"
                text="light"
              >
                {favouritesCount}
              </Badge>
            </Nav.Link>

            <Button
              variant="dark"
              onClick={onBrowse}
              className="text-nowrap"
              style={{ marginLeft: "8px" }}
            >
              Browse recipes
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
