import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishlistContext";

function Header() {
  const navigate = useNavigate();

  // đảm bảo có fallback để tránh lỗi undefined
  const { user, logout } = useContext(AuthContext) || {
    user: null,
    logout: () => {},
  };
  const { items = [], count = 0 } = useContext(CartContext) || {
    items: [],
    count: 0,
  };
  const { wishlist = [] } = useContext(WishlistContext) || { wishlist: [] };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          MyShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/wishlist"
            >
              Wishlist
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/cart"
            >
              Cart <Badge bg="success">{count}</Badge>
            </Nav.Link>

            {user ? (
              <NavDropdown
                title={user.username || user.email}
                id="username"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/account"
                >
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/wishlist"
                >
                  Wishlist
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                >
                  Sign in
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                >
                  Create Account
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
