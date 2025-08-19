import React from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import PropTypes from "prop-types";

const Filters = ({
  search,
  setSearch,
  ageFilter,
  setAgeFilter,
  hasAvatar,
  setHasAvatar,
}) => {
  return (
    <Card className="mb-4 shadow-sm filters-section">
      <Card.Header className="bg-light">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filters
        </h5>
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          <Col
            xs={12}
            md={4}
          >
            <Form.Label>
              <i className="bi bi-search me-1"></i>
              Search by name/email
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          <Col
            xs={12}
            md={4}
          >
            <Form.Label>
              <i className="bi bi-calendar-range me-1"></i>
              Age Range
            </Form.Label>
            <Form.Select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              <option value="">All Ages</option>
              <option value="≤20">≤ 20 years</option>
              <option value="21-25">21 - 25 years</option>
              <option value=">25">&gt; 25 years</option>
            </Form.Select>
          </Col>

          <Col
            xs={12}
            md={4}
            className="d-flex align-items-end"
          >
            <Form.Check
              type="checkbox"
              id="avatarCheck"
              label={
                <span>
                  <i className="bi bi-image me-1"></i>
                  Has Avatar
                </span>
              }
              checked={hasAvatar}
              onChange={(e) => setHasAvatar(e.target.checked)}
              className="mt-3"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

Filters.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  ageFilter: PropTypes.string.isRequired,
  setAgeFilter: PropTypes.func.isRequired,
  hasAvatar: PropTypes.bool.isRequired,
  setHasAvatar: PropTypes.func.isRequired,
};

export default Filters;
