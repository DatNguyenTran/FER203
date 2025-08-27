import React, { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import "../App.css";

const DishesList = ({ dishes, searchTerm }) => {
  const { addToCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);

  const filtered = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-3">Danh sách món ăn</h2>
      <Row>
        {filtered.length > 0 ? (
          filtered.map((dish) => (
            <Col
              key={dish.id}
              md={3}
              className="mb-4"
            >
              <Card className={`h-100 ${darkMode ? "bg-dark text-light" : ""}`}>
                <Card.Img
                  variant="top"
                  src={dish.image}
                  alt={dish.name}
                  className="dish-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Card.Text>💲 {parseFloat(dish.price).toFixed(2)}</Card.Text>
                  <div className="mt-auto">
                    <Button
                      variant="success"
                      onClick={() => addToCart(dish)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>⚠️ Không tìm thấy món ăn nào</p>
        )}
      </Row>
    </div>
  );
};

export default DishesList;
