import React from "react";
import { Navbar, Nav, Container, Badge, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const { getFavouritesCount } = useFavourites();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar
      bg={isDark ? "dark" : "light"}
      variant={isDark ? "dark" : "light"}
      expand="lg"
      className="mb-3"
      fixed="top"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4"
        >
          FoodApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="fw-medium px-3"
            >
              🏠 Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className="fw-medium px-3"
            >
              🛍️ Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/register"
              className="fw-medium px-3"
            >
              📝 Register
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {/* Theme Toggle */}
            <Nav.Link
              onClick={toggleTheme}
              className="px-3 d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              {isDark ? "☀️" : "🌙"}
            </Nav.Link>

            {/* Cart Icon */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative px-3 d-flex align-items-center"
              style={{ minWidth: "40px", justifyContent: "center" }}
            >
              🛒
              {getTotalItems() > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute"
                  style={{
                    top: "-8px",
                    right: "8px",
                    fontSize: "0.7rem",
                    minWidth: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    zIndex: 1000,
                  }}
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Nav.Link>

            {/* Favourites Icon */}
            <Nav.Link
              as={Link}
              to="/favourites"
              className="position-relative px-3 d-flex align-items-center"
              style={{ minWidth: "40px", justifyContent: "center" }}
            >
              ❤️
              {getFavouritesCount() > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute"
                  style={{
                    top: "-8px",
                    right: "8px",
                    fontSize: "0.7rem",
                    minWidth: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    zIndex: 1000,
                  }}
                >
                  {getFavouritesCount()}
                </Badge>
              )}
            </Nav.Link>

            {/* User Menu */}
            <Dropdown className="ms-2">
              <Dropdown.Toggle
                variant={isDark ? "outline-light" : "outline-dark"}
                id="dropdown-basic"
                className="d-flex align-items-center"
              >
                👤
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isAuthenticated ? (
                  <>
                    <Dropdown.Item
                      as={Link}
                      to="/profile"
                    >
                      👤 Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/favourites"
                    >
                      ❤️ My Favourites
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      🚪 Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item
                    as={Link}
                    to="/login"
                  >
                    🔑 Login
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
