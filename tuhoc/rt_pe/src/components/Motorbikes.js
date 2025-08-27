import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Motorbikes() {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Motorbikes")
      .then((res) => {
        const data = res.data.map((bike) => ({
          ...bike,
          priceValue: Number(bike.price.replace("$", "")),
        }));
        setBikes(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredBikes = bikes.filter((bike) =>
    bike.model.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBikes = [...filteredBikes].sort((a, b) => {
    if (sortOrder === "asc") return a.priceValue - b.priceValue;
    if (sortOrder === "desc") return b.priceValue - a.priceValue;
    return 0;
  });

  const handleAddToCart = (bike) => {
    dispatch({ type: "ADD", payload: bike });
    setAlert(`${bike.model} has been added to your cart.`);
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Motorbike List</h2>

      {alert && (
        <Alert
          variant="success"
          className="text-center"
        >
          {alert}{" "}
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </Button>
        </Alert>
      )}

      <Row className="mb-3 justify-content-center">
        <Col
          md={8}
          lg={6}
          className="d-flex gap-2"
        >
          <Form.Control
            type="text"
            placeholder="Search by model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {sortedBikes.length > 0 ? (
          sortedBikes.map((bike) => (
            <Col
              key={bike.id}
              md={3}
              className="mb-4"
            >
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={bike.image}
                  alt={bike.model}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    {bike.brand} {bike.model}
                  </Card.Title>
                  <Card.Text className="mb-3">
                    <strong>Year:</strong> {bike.year} <br />
                    <strong>Price:</strong> {bike.price} <br />
                    <strong>Stock:</strong> {bike.stock}
                  </Card.Text>

                  <div className="mt-auto d-flex justify-content-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/view/${bike.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAddToCart(bike)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">⚠️ Không có motorbike nào</p>
        )}
      </Row>
    </Container>
  );
}

export default Motorbikes;
