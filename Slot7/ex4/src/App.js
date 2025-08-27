import NameList from "./components/NameList";
import UserProfile from "./components/UserProfile";
import Welcome from "./components/Welcome";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import StudentCard from "./components/StudentCard";

function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const namesList = ["traltb@fe.edu.vn", "test@fe.edu.vn"];
  const students = [
    { name: "ronaldo@fe.edu.vn", age: 39, avatar: "/images/student1.jpg" },
    { name: "messi@fe.edu.vn", age: 40, avatar: "/images/student2.jpg" },
    { name: "neymar@fe.edu.vn", age: 41, avatar: "/images/student3.jpg" },
  ];
  return (
    <>
      <Welcome name="traltb@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />{" "}
      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row className="g-4 justify-content-center">
          {students.map((student, index) => (
            <Col
              key={index}
              xs={12}
              md={4}
            >
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>{" "}
    </>
  );
}

export default App;
