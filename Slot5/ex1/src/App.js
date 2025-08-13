import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";
import Footer from "./components/Footer";
import RequestFormModal from "./components/RequestFormModal";
import {
  Toast,
  ToastContainer,
  Alert,
  Container,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import "./App.css";

const recipesData = [
  {
    title: "Mediterranean Chickpea Salad",
    description:
      "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    servings: 2,
    prep: 10,
    cook: 0,
    image: "/images/OIP (1).jpg",
  },
  {
    title: "Avocado & Tomato Wholegrain Toast",
    description:
      "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    servings: 1,
    prep: 5,
    cook: 5,
    image: "/images/OIP (2).jpg",
  },
  {
    title: "One-Pan Lemon Garlic Salmon",
    description:
      "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    servings: 2,
    prep: 5,
    cook: 12,
    image: "/images/OIP (3).jpg",
  },
  {
    title: "Quinoa Veggie Power Bowl",
    description:
      "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    servings: 2,
    prep: 10,
    cook: 15,
    image: "/images/OIP (4).jpg",
  },
  {
    title: "Sweet Potato Black Bean Tacos",
    description:
      "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    servings: 3,
    prep: 10,
    cook: 15,
    image: "/images/OIP (5).jpg",
  },
  {
    title: "Greek Yogurt Berry Parfait",
    description:
      "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    servings: 1,
    prep: 5,
    cook: 0,
    image: "/images/OIP (6).jpg",
  },
  {
    title: "Lentil & Spinach Soup",
    description: "A hearty 30-minute soup rich in plant protein and iron.",
    servings: 4,
    prep: 10,
    cook: 20,
    image: "/images/OIP (7).jpg",
  },
  {
    title: "Banana Oat Pancakes",
    description: "Flour-free pancakes sweetened naturally with ripe bananas.",
    servings: 2,
    prep: 5,
    cook: 10,
    image: "/images/OIP (1).jpg",
  },
];

function App() {
  const [recipes] = useState(recipesData);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

  // Modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Toast + Alert
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Filters + search + sort
  const [searchTerm, setSearchTerm] = useState("");
  const [prepFilter, setPrepFilter] = useState("Max Prep Time");
  const [cookFilter, setCookFilter] = useState("Max Cook Time");
  const [sortOption, setSortOption] = useState("");

  // Favourites + Form
  const [favourites, setFavourites] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Called from Hero (debounced inside Hero)
  const handleSearch = (term) => setSearchTerm(term);
  const handleFilterChange = (filters) => {
    if (typeof filters.prep !== "undefined") setPrepFilter(filters.prep);
    if (typeof filters.cook !== "undefined") setCookFilter(filters.cook);
  };

  // Sort handler
  const handleSortChange = (option) => setSortOption(option);

  // Add to favourite
  const handleAddFavourite = (recipe) => {
    if (!favourites.includes(recipe.title)) {
      setFavourites((prev) => [...prev, recipe.title]);
      setToastMessage(`"${recipe.title}" added to favourites ❤️`);
      setShowToast(true);
    }
  };

  // Add to cart from modal
  const handleAddToCart = (recipe) => {
    setToastMessage(`${recipe.title} has been added to your cart! 🛒`);
    setShowToast(true);
  };

  // Compute filtered + sorted list
  useEffect(() => {
    let next = [...recipes];

    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      next = next.filter(
        (r) =>
          r.title.toLowerCase().includes(trimmed) ||
          r.description.toLowerCase().includes(trimmed)
      );
    }

    const parsedPrep = parseInt(prepFilter);
    if (!isNaN(parsedPrep)) next = next.filter((r) => r.prep <= parsedPrep);

    const parsedCook = parseInt(cookFilter);
    if (!isNaN(parsedCook)) next = next.filter((r) => r.cook <= parsedCook);

    switch (sortOption) {
      case "name-asc":
        next.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        next.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "prep-asc":
        next.sort((a, b) => a.prep - b.prep);
        break;
      case "prep-desc":
        next.sort((a, b) => b.prep - a.prep);
        break;
      case "cook-asc":
        next.sort((a, b) => a.cook - b.cook);
        break;
      case "cook-desc":
        next.sort((a, b) => b.cook - a.cook);
        break;
      default:
        break;
    }

    setFilteredRecipes(next);
    setCurrentPage(1);

    if (next.length === 0) {
      setAlertMessage("Không tìm thấy công thức nào phù hợp.");
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [recipes, searchTerm, prepFilter, cookFilter, sortOption]);

  // Modal view
  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  // Pagination paging
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  return (
    <div className="App">
      <Header
        favouritesCount={favourites.length}
        onShowForm={() => setShowFormModal(true)}
        onBrowse={() => {
          const el = document.getElementById("recipe-grid");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <section className="py-4 bg-light border-bottom">
        <Container>
          <h1 className="h3 mb-2">Explore our simple, healthy recipes…</h1>
          <p className="text-muted mb-0">
            Tìm món yêu thích của bạn theo tên, nguyên liệu, thời gian chuẩn bị
            và nấu nướng. Nhấp “View Recipe” để xem chi tiết.
          </p>
        </Container>
      </section>

      <Hero
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      <Container className="mt-3">
        <Row className="mb-3 align-items-center">
          <Col
            md={6}
            className="mb-2 mb-md-0"
          >
            <Dropdown onSelect={handleSortChange}>
              <Dropdown.Toggle variant="secondary">Sort by</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="name-asc">Name A→Z</Dropdown.Item>
                <Dropdown.Item eventKey="name-desc">Name Z→A</Dropdown.Item>
                <Dropdown.Item eventKey="prep-asc">Prep ↑</Dropdown.Item>
                <Dropdown.Item eventKey="prep-desc">Prep ↓</Dropdown.Item>
                <Dropdown.Item eventKey="cook-asc">Cook ↑</Dropdown.Item>
                <Dropdown.Item eventKey="cook-desc">Cook ↓</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col
            md={6}
            className="text-md-end"
          >
            <Dropdown onSelect={(val) => setItemsPerPage(Number(val))}>
              <Dropdown.Toggle variant="secondary">
                Items per page: {itemsPerPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey={6}>6</Dropdown.Item>
                <Dropdown.Item eventKey={9}>9</Dropdown.Item>
                <Dropdown.Item eventKey={12}>12</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {showAlert && (
          <Alert
            variant="warning"
            dismissible
            onClose={() => setShowAlert(false)}
          >
            {alertMessage}
          </Alert>
        )}

        <div id="recipe-grid">
          <RecipeList
            recipes={currentRecipes}
            onViewRecipe={handleViewRecipe}
            onAddFavourite={handleAddFavourite}
          />
        </div>

        {/* Pagination */}
        <nav
          aria-label="pagination"
          className="d-flex justify-content-center mt-4"
        >
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(1)}
              >
                &laquo;
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                &lt;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                &gt;
              </button>
            </li>
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(totalPages)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </Container>

      <Footer />

      <RecipeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        recipe={selectedRecipe}
        onAddToCart={handleAddToCart}
      />

      <RequestFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
      />

      {/* Toast cố định ở góc phải dưới */}
      <ToastContainer
        className="p-3"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 9999,
        }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
