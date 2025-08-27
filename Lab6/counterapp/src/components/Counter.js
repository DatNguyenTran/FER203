import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./storeCounter";
import { Container, Card, Button } from "react-bootstrap";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="shadow-lg p-4 text-center"
        style={{ width: "300px" }}
      >
        <h3 className="mb-3">🔢 Counter App</h3>
        <h2 className="display-5">{count}</h2>
        <div className="d-flex justify-content-around mt-3">
          <Button
            variant="success"
            onClick={() => dispatch(increment())}
          >
            +
          </Button>
          <Button
            variant="danger"
            onClick={() => dispatch(decrement())}
          >
            -
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Counter;
