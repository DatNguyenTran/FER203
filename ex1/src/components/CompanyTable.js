import React from "react";
import { Table } from "react-bootstrap";

export default function CompanyTable({ companies }) {
  if (companies.length === 0) {
    return <p className="text-danger">No result</p>;
  }

  return (
    <Table
      striped
      bordered
      hover
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((c, index) => (
          <tr key={index}>
            <td>{c.name}</td>
            <td>{c.category}</td>
            <td>{c.start}</td>
            <td>{c.end}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
