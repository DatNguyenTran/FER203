import React from "react";
import { Dropdown } from "react-bootstrap";

function SortDropdown({ onChange }) {
  return (
    <Dropdown onSelect={(key) => onChange(key)}>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-sort"
      >
        Sort by
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="name-asc">Name A → Z</Dropdown.Item>
        <Dropdown.Item eventKey="name-desc">Name Z → A</Dropdown.Item>
        <Dropdown.Item eventKey="prep-asc">Prep ↑</Dropdown.Item>
        <Dropdown.Item eventKey="prep-desc">Prep ↓</Dropdown.Item>
        <Dropdown.Item eventKey="cook-asc">Cook ↑</Dropdown.Item>
        <Dropdown.Item eventKey="cook-desc">Cook ↓</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
