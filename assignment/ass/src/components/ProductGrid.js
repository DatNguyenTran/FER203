import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { Form, Row, Col } from "react-bootstrap";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const visibleProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "az") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "priceAsc")
      result.sort(
        (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
      );
    if (sort === "priceDesc")
      result.sort(
        (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
      );
    return result;
  }, [products, query, sort]);

  return (
    <div className="container mt-3">
      <div className="d-flex mb-3">
        <Form.Control
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <Form.Select
          className="ms-2"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="az">Name A→Z</option>
          <option value="priceAsc">Price Ascending</option>
          <option value="priceDesc">Price Descending</option>
        </Form.Select>
      </div>

      <Row>
        {visibleProducts.map((p) => (
          <Col
            key={p.id}
            xs={12}
            sm={6}
            lg={4}
            className="mb-4"
          >
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductGrid;
