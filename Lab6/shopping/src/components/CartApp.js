import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "./storeCart";
import { Container, Card, Button, ListGroup } from "react-bootstrap";

function CartApp() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="shadow-lg p-4"
        style={{ width: "450px" }}
      >
        <h3 className="text-center mb-3">🛒 Shopping Cart</h3>
        <div className="d-flex justify-content-center mb-3">
          <Button
            variant="success"
            className="me-2"
            onClick={() => dispatch(addItem("🍎 Apple"))}
          >
            Add Apple
          </Button>
          <Button
            variant="warning"
            onClick={() => dispatch(addItem("🍌 Banana"))}
          >
            Add Banana
          </Button>
        </div>
        <ListGroup>
          {cart.map((item, i) => (
            <ListGroup.Item
              key={i}
              className="d-flex justify-content-between align-items-center"
            >
              {item}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => dispatch(removeItem(i))}
              >
                ❌
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default CartApp;
