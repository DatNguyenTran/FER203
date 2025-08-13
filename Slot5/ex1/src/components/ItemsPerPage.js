import React from "react";
import { Dropdown } from "react-bootstrap";

function ItemsPerPage({ value, onChange }) {
  return (
    <Dropdown onSelect={(key) => onChange(Number(key))}>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-items"
      >
        Items per page: {value}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="6">6</Dropdown.Item>
        <Dropdown.Item eventKey="9">9</Dropdown.Item>
        <Dropdown.Item eventKey="12">12</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ItemsPerPage;
