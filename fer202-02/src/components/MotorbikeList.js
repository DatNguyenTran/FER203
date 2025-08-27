import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext, BikeContext } from "./GlobalContext";

function MotorbikeList() {
  const { bikes, bikeDispatch } = useContext(BikeContext);
  const { cartDispatch } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  if (!bikes || bikes.length === 0) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </div>
    );
  }

  const filteredBikes = bikes.filter((bike) =>
    bike.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBikes = [...filteredBikes].sort((a, b) => {
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

  const handleAddToCart = (bike) => {
    if (bike.stock > 0) {
      cartDispatch({ type: "ADD_TO_CART", payload: bike });
      bikeDispatch({ type: "DECREASE_STOCK", payload: bike.id });

      axios.patch(`http://localhost:3001/Motorbikes/${bike.id}`, {
        stock: bike.stock - 1,
      });
    } else {
      alert("Out of stock!");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Motorbike List</h2>

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

      <Row>
        {sortedBikes.map((bike) => (
          <Col
            md={3}
            sm={6}
            xs={12}
            key={bike.id}
            className="mb-4"
          >
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={bike.image}
                alt={bike.model}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>
                  {bike.brand} {bike.model}
                </Card.Title>
                <Card.Text>
                  <strong>Year:</strong> {bike.year} <br />
                  <strong>Price:</strong> {bike.price} <br />
                  <strong>Stock:</strong> {bike.stock}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/view/${bike.id}`}>
                    <Button variant="info">View Details</Button>
                  </Link>
                  <Button
                    variant="success"
                    onClick={() => handleAddToCart(bike)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {sortedBikes.length === 0 && (
        <p className="text-center text-muted mt-4">No motorbikes found</p>
      )}
    </Container>
  );
}

export default MotorbikeList;
