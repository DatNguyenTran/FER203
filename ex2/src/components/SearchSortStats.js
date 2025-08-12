import React, { useState } from "react";
import PersonList from "./PersonList";

export default function SearchSortStats({ data }) {
  const [query, setQuery] = useState("");

  const filtered = data.filter((p) =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(query.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a.isActive !== b.isActive) return b.isActive - a.isActive;
    if (a.age !== b.age) return a.age - b.age;
    return a.lastName.localeCompare(b.lastName);
  });

  const stats = sorted.reduce(
    (acc, p) => {
      acc.total++;
      acc.totalAge += p.age;
      if (p.isActive) acc.active++;
      return acc;
    },
    { total: 0, totalAge: 0, active: 0 }
  );

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <PersonList people={sorted} />

      <div className="mt-3 p-3 border rounded bg-light w-50">
        <h5>Statistics</h5>
        <p>Total people: {stats.total}</p>
        <p>
          Average age:{" "}
          {stats.total > 0 ? (stats.totalAge / stats.total).toFixed(1) : 0}
        </p>
        <p>Active people: {stats.active}</p>
      </div>
    </div>
  );
}
