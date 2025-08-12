import React from "react";

export default function PersonList({ people }) {
  if (people.length === 0) {
    return <p className="text-danger">No found.</p>;
  }
  return (
    <ul className="list-group">
      {people.map((p) => (
        <li
          key={p.id}
          className="list-group-item"
        >
          <strong>
            {p.firstName} {p.lastName}
          </strong>{" "}
          - Age: {p.age} - {p.city}
          <br />
          Skills: {p.skills.join(", ")}
        </li>
      ))}
    </ul>
  );
}
