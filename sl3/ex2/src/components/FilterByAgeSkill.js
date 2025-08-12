import React, { useState } from "react";
import PersonList from "./PersonList";

export default function FilterByAgeSkill({ data }) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [skill, setSkill] = useState("");

  const allSkills = [...new Set(data.flatMap((p) => p.skills))];

  const filtered = data.filter(({ age, skills }) => {
    const inAgeRange =
      (min === "" || age >= parseInt(min)) &&
      (max === "" || age <= parseInt(max));
    const hasSkill = skill === "" || skills.includes(skill);
    return inAgeRange && hasSkill;
  });

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Min age"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max age"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <select
          className="form-select"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        >
          <option value="">All Skills</option>
          {allSkills.map((s) => (
            <option
              key={s}
              value={s}
            >
              {s}
            </option>
          ))}
        </select>
      </div>
      {filtered.length > 0 ? (
        <ul className="list-group">
          {filtered.map(({ id, firstName, lastName, skills }) => (
            <li
              key={id}
              className="list-group-item"
            >
              {firstName} {lastName} - {skills.join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-danger">No found.</p>
      )}
    </div>
  );
}
