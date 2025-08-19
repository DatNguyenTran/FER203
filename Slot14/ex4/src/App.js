// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // nếu đã import trong index.js thì bỏ dòng này
import { Container, Navbar, Nav } from "react-bootstrap";
import ValidatedInput from "./components/ValidatedInput";

function App() {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
      >
        <Container>
          <Navbar.Brand>Form Validation Demo</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container
        className="py-4"
        style={{ maxWidth: 720 }}
      >
        <h2 className="mb-3">Exercise 4 — useEffect validation</h2>
        <p>
          Dán component form của bạn vào bên dưới, nhập ít nhất 5 ký tự để bật
          nút Gửi. Khi gửi sẽ hiện Toast và Modal chứa dữ liệu đã gửi.
        </p>

        <ValidatedInput />
      </Container>
    </>
  );
}

export default App;
