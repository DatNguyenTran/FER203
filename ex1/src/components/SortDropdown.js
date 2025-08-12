import React from "react";
import { Form } from "react-bootstrap";

export default function SortDropdown({ sortOption, onSortChange }) {
  return (
    <Form.Select
      value={sortOption}
      onChange={(e) => onSortChange(e.target.value)}
      className="mb-3"
    >
      <option value="">Sort by...</option>
      <option value="start-asc">Start Year ↑</option>
      <option value="start-desc">Start Year ↓</option>
      <option value="period">From Start to End</option>
    </Form.Select>
  );
}
