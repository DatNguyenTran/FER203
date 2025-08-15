import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { allGenres } from "../data/movies";

export default function MovieRequestForm() {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    year: "",
    duration: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [ok, setOk] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title) e.title = "Title is required";
    if (!form.genre) e.genre = "Genre is required";
    if (!form.year || Number(form.year) <= 1900) e.year = "Year must be > 1900";
    if (!form.duration || Number(form.duration) <= 0)
      e.duration = "Duration must be > 0";
    if (!form.description || form.description.length < 30)
      e.description = "Min 30 characters";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setOk(true);
  };

  return (
    <Form onSubmit={submit}>
      {ok && <Alert variant="success">Request submitted. Thank you!</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          isInvalid={!!errors.title}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Select
          isInvalid={!!errors.genre}
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        >
          <option value="">Select genre</option>
          {allGenres
            .filter((g) => g !== "All")
            .map((g) => (
              <option key={g}>{g}</option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.genre}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          isInvalid={!!errors.year}
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.year}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Duration (minutes)</Form.Label>
        <Form.Control
          type="number"
          isInvalid={!!errors.duration}
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.duration}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          isInvalid={!!errors.description}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
