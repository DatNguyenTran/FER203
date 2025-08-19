import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const SortDropdown = ({ sort, setSort }) => {
  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="outline-secondary">
        <i className="bi bi-sort-down me-1"></i>
        Sort
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSort("age-asc")}>
          <i className="bi bi-sort-numeric-up me-1"></i>
          Age ↑
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("age-desc")}>
          <i className="bi bi-sort-numeric-down me-1"></i>
          Age ↓
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("name-asc")}>
          <i className="bi bi-sort-alpha-up me-1"></i>
          Name A→Z
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("name-desc")}>
          <i className="bi bi-sort-alpha-down me-1"></i>
          Name Z→A
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

SortDropdown.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default SortDropdown;
