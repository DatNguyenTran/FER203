import React, { useEffect, useMemo, useState } from "react";
import { Carousel, Container, Row, Col, Form } from "react-bootstrap";

function Hero({ onSearch, onFilterChange }) {
  const [localSearch, setLocalSearch] = useState("");
  const [prep, setPrep] = useState("Max Prep Time");
  const [cook, setCook] = useState("Max Cook Time");

  const debouncedValue = useDebounce(localSearch, 300);
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handlePrepChange = (e) => {
    setPrep(e.target.value);
    onFilterChange({ prep: e.target.value });
  };

  const handleCookChange = (e) => {
    setCook(e.target.value);
    onFilterChange({ cook: e.target.value });
  };

  const heroImages = useMemo(
    () => ["/images/hero1.jpg", "/images/hero2.jpg", "/images/hero3.jpg"],
    []
  );
  const fallback = "/images/fallback.jpg";

  return (
    <div>
      <Carousel>
        {heroImages.map((src, idx) => (
          <Carousel.Item
            key={idx}
            style={{ maxHeight: "480px", overflow: "hidden" }}
          >
            <img
              className="d-block w-100"
              src={src}
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
              alt={`Slide ${idx + 1}`}
              style={{ height: "480px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Fresh & Healthy</h3>
              <p>Discover delicious, easy recipes for every day.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-3">
        <Row className="g-2 align-items-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by name or ingredient..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={prep}
              onChange={handlePrepChange}
            >
              <option>Max Prep Time</option>
              <option value="5">≤ 5 mins</option>
              <option value="10">≤ 10 mins</option>
              <option value="15">≤ 15 mins</option>
              <option value="30">≤ 30 mins</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={cook}
              onChange={handleCookChange}
            >
              <option>Max Cook Time</option>
              <option value="5">≤ 5 mins</option>
              <option value="10">≤ 10 mins</option>
              <option value="15">≤ 15 mins</option>
              <option value="30">≤ 30 mins</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

/** Hook debounce nhỏ gọn */
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default Hero;
