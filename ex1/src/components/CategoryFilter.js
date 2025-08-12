import React from "react";
import { Form } from "react-bootstrap";

export default function CategoryFilter({
  category,
  onCategoryChange,
  categories,
}) {
  return (
    <Form.Select
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="mb-3"
    >
      <option value="">All Categories</option>
      {categories.map((cat, index) => (
        <option
          key={index}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </Form.Select>
  );
}
