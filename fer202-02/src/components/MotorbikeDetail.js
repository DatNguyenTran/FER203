import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { CartContext, BikeContext } from "./GlobalContext";

function MotorbikeDetail() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cartDispatch } = useContext(CartContext);
  const { bikeDispatch } = useContext(BikeContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Motorbikes/${id}`)
      .then((res) => {
        if (res.data) setBike(res.data);
        else setError("Motorbike not found!");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading motorbike!");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Link to="/motorbikes">
          <Button variant="secondary">Back to List</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container
      className="mt-4"
      style={{ maxWidth: "600px" }}
    >
      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={bike.image}
          alt={bike.model}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>
            {bike.brand} {bike.model}
          </Card.Title>
          <Card.Text>
            <strong>Year:</strong> {bike.year} <br />
            <strong>Price:</strong> {bike.price} <br />
            <strong>Stock:</strong> {bike.stock} <br />
            <strong>Description:</strong> {bike.description}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Link to="/motorbikes">
              <Button variant="secondary">Back</Button>
            </Link>
            <Button
              variant="success"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MotorbikeDetail;
