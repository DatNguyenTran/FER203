import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "./storeTodo";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";

function TodoApp() {
  const [input, setInput] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card
        className="shadow-lg p-4"
        style={{ width: "400px" }}
      >
        <h3 className="text-center mb-3">📝 Todo List</h3>
        <Form className="d-flex mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="primary"
            className="ms-2"
            onClick={() => {
              if (input) {
                dispatch(addTodo(input));
                setInput("");
              }
            }}
          >
            Add
          </Button>
        </Form>
        <ListGroup>
          {todos.map((t) => (
            <ListGroup.Item
              key={t.id}
              className="d-flex justify-content-between align-items-center"
            >
              {t.text}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => dispatch(removeTodo(t.id))}
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

export default TodoApp;
