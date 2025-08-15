import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { allGenres } from "../data/movies";

export default function SearchFilterBar({
  search,
  setSearch,
  genre,
  setGenre,
  sortOrder,
  setSortOrder,
}) {
  return (
    <Row className="align-items-center g-3 mb-3">
      <Col md={5}>
        <InputGroup>
          <InputGroup.Text>🔎</InputGroup.Text>
          <Form.Control
            placeholder="Search title or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col md={3}>
        <Form.Select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {allGenres.map((g) => (
            <option
              key={g}
              value={g}
            >
              {g}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="None">Sort: None</option>
          <option value="asc">Duration ↑</option>
          <option value="desc">Duration ↓</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

SearchFilterBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};
