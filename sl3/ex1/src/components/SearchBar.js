import React from "react";
import { Form, Button } from "react-bootstrap";

export default function SearchBar({
  searchTerm,
  onSearchChange,
  onSearchClick,
}) {
  return (
    <div className="d-flex mb-3">
      <Form.Control
        type="text"
        placeholder="Search company..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="me-2"
      />
      <Button
        variant="primary"
        onClick={onSearchClick}
      >
        Search
      </Button>
    </div>
  );
}
