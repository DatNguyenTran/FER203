import React from "react";
import "../App.css";

function Filters() {
  return (
    <div className="filters">
      <select>
        <option>Max Prep Time</option>
        <option>15 min</option>
        <option>30 min</option>
        <option>45 min</option>
      </select>
      <select>
        <option>Max Cook Time</option>
        <option>15 min</option>
        <option>30 min</option>
        <option>45 min</option>
      </select>
      <input
        type="text"
        placeholder="Search recipes..."
      />
    </div>
  );
}

export default Filters;
