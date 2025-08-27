import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";

function ViewList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      // 🔹 API collection — chỉ cần đổi URL cho phù hợp
      .get("http://localhost:3001/Cars")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Lọc theo search (ví dụ theo model)
  // muốn search thay chỗ item....(brand hoặc modal)
  //    // 🔹 Filter theo brand OR model
  //   const filteredItems = items.filter((item) => {
  //     const text = searchTerm.toLowerCase();
  //     return (
  //       item.model.toLowerCase().includes(text) ||
  //       item.brand.toLowerCase().includes(text)
  //     );
  //   });
  const filteredItems = items.filter((item) =>
    item.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp theo price
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return (
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", ""))
      );
    } else if (sortOrder === "desc") {
      return (
        parseFloat(b.price.replace("$", "")) -
        parseFloat(a.price.replace("$", ""))
      );
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Motorbike List</h2>

      {/* Search & Sort */}
      <div className="d-flex justify-content-between mb-4">
        <Form.Control
          type="text"
          placeholder="Search by model..."
          style={{ maxWidth: "300px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Form.Select
          style={{ maxWidth: "200px" }}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </Form.Select>
      </div>

      {/* Grid hiển thị card */}
      <Row>
        {sortedItems.map((item) => (
          <Col
            md={3}
            sm={6}
            xs={12}
            key={item.id}
            className="mb-4"
          >
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.model}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>
                  {item.brand} {item.model}
                </Card.Title>
                <Card.Text>
                  <strong>Year:</strong> {item.year} <br />
                  <strong>Price:</strong> {item.price} <br />
                  <strong>Stock:</strong> {item.stock}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="info">View Details</Button>
                  <Button variant="success">Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {sortedItems.length === 0 && (
        <p className="text-center text-muted mt-4">No items found</p>
      )}
    </Container>
  );
}

export default ViewList;
