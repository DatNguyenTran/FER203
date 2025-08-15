import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Toast } from "react-bootstrap";
import { Routes, Route, useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import CarouselHero from "./components/CarouselHero";
import SearchFilterBar from "./components/SearchFilterBar";
import MovieCard from "./components/MovieCard";
import MovieRequestForm from "./components/MovieRequestForm";
import FavouritesPage from "./pages/FavouritesPage";
import { movies as moviesData } from "./data/movies";

export default function App() {
  const [movies] = useState(moviesData);
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("None");
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const filteredMovies = useMemo(() => {
    let result = movies.filter((m) =>
      (m.title + " " + m.description)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    if (genre !== "All") result = result.filter((m) => m.genre === genre);
    if (sortOrder === "asc")
      result = [...result].sort((a, b) => a.duration - b.duration);
    if (sortOrder === "desc")
      result = [...result].sort((a, b) => b.duration - a.duration);
    return result;
  }, [movies, search, genre, sortOrder]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : (setShowToast(true), [...prev, id])
    );
  };

  return (
    <>
      <AppNavbar activePath={location.pathname} />
      <Container style={{ marginTop: 88, marginBottom: 32 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Carousel tự chạy + bấm chuyển */}
                <CarouselHero items={movies.slice(0, 3)} />

                <SearchFilterBar
                  search={search}
                  setSearch={setSearch}
                  genre={genre}
                  setGenre={setGenre}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
                <Row className="g-3">
                  {filteredMovies.length === 0 ? (
                    <Col>
                      <div className="alert alert-warning">
                        No movies found.
                      </div>
                    </Col>
                  ) : (
                    filteredMovies.map((m) => (
                      <Col
                        key={m.id}
                        sm={6}
                        md={4}
                        lg={3}
                      >
                        <MovieCard
                          movie={m}
                          isFav={favourites.includes(m.id)}
                          onToggleFav={() => toggleFavourite(m.id)}
                        />
                      </Col>
                    ))
                  )}
                </Row>
              </>
            }
          />
          <Route
            path="/favourites"
            element={
              <FavouritesPage
                movies={movies.filter((m) => favourites.includes(m.id))}
                onToggleFav={toggleFavourite}
              />
            }
          />
          <Route
            path="/request"
            element={<MovieRequestForm />}
          />
        </Routes>
      </Container>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={1800}
        autohide
        style={{ position: "fixed", right: 20, bottom: 20, zIndex: 1060 }}
      >
        <Toast.Body>Added to favourites!</Toast.Body>
      </Toast>
    </>
  );
}
