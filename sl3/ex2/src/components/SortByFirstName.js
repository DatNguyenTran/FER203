import React, { useState } from "react";
import PersonList from "./PersonList";

export default function SortByFirstName({ data }) {
  const [order, setOrder] = useState("asc");

  const sorted = [...data].sort((a, b) =>
    order === "asc"
      ? a.firstName.localeCompare(b.firstName)
      : b.firstName.localeCompare(a.firstName)
  );

  return (
    <div>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
      >
        Sort First Name: {order === "asc" ? "A → Z" : "Z → A"}
      </button>
      <PersonList people={sorted} />
    </div>
  );
}
