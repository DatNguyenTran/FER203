import { useMemo, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import StudentCard from "./StudentCard";
import students from "../students";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchClass = filterClass === "All" || s.className === filterClass;
      return matchName && matchClass;
    });
  }, [search, filterClass]);

  const classes = useMemo(() => {
    return ["All", ...new Set(students.map((s) => s.className))];
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Students List</h2>

      <Row className="mb-4 g-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option
                key={cls}
                value={cls}
              >
                {cls}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-4">
        {filteredStudents.map((student) => (
          <Col
            md={4}
            sm={6}
            key={student.id}
          >
            <StudentCard student={student} />
          </Col>
        ))}
        {filteredStudents.length === 0 && (
          <p className="text-center text-muted">No students found</p>
        )}
      </Row>
    </Container>
  );
}
