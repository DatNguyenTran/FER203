import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "./components/MyForm";
import ValidatedForm from "./components/ValidatedForm";

const App = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">PropTypes Demo – All Examples</h1>

      {/* Example 1 */}
      <h2>Example 1: UserProfile</h2>
      <Row className="mb-4">
        <Col
          md={6}
          lg={4}
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Hợp lệ</Card.Title>
              <UserProfile
                name="Nguyễn Văn A"
                age={25}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col
          md={6}
          lg={4}
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              <Card.Title>name không hợp lệ</Card.Title>
              <UserProfile
                name=""
                age={25}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col
          md={6}
          lg={4}
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              <Card.Title>age không hợp lệ</Card.Title>
              <UserProfile
                name="Nguyễn Văn B"
                age="twenty five"
              />
            </Card.Body>
          </Card>
        </Col>
        <Col
          md={6}
          lg={4}
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Không nhập tuổi</Card.Title>
              <UserProfile
                name="Nguyễn Văn C"
                age={null}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Example 2 */}
      <h2>Example 2: UserProfile2 (Form)</h2>
      <Row className="mb-4">
        <Col
          md={6}
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              <UserProfile2
                name="Nguyễn Văn A"
                age={25}
                onSubmit={(data) =>
                  alert("Đã gửi (A): " + JSON.stringify(data))
                }
              />
            </Card.Body>
          </Card>
        </Col>
        <Col
          md={6}
          className="mb-3"
        >
          <Card className="h-100">
            <Card.Body>
              <UserProfile2
                name=""
                age="twenty five"
                onSubmit={(data) =>
                  alert("Đã gửi (B): " + JSON.stringify(data))
                }
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Example 3 */}
      <h2>Example 3: MyForm (useReducer)</h2>
      <Row className="mb-4">
        <Col
          md={8}
          lg={6}
        >
          <Card>
            <Card.Body>
              <MyForm
                title="Đăng Ký Người Dùng"
                onSubmit={(data) =>
                  alert("MyForm submitted: " + JSON.stringify(data))
                }
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Example 4 */}
      <h2>Example 4: ValidatedForm (Advanced Validation + Gender)</h2>
      <Row>
        <Col
          md={8}
          lg={6}
        >
          <Card>
            <Card.Body>
              <ValidatedForm
                onSubmit={(data) =>
                  alert("ValidatedForm submitted: " + JSON.stringify(data))
                }
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
