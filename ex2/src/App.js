import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { persons } from "./data/person";
import SortByFirstName from "./components/SortByFirstName";
import FilterByAgeSkill from "./components/FilterByAgeSkill";
import SkillRanking from "./components/SkillRanking";
import SearchSortStats from "./components/SearchSortStats";

export default function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Person Management</h1>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <SortByFirstName data={persons} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <FilterByAgeSkill data={persons} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <SkillRanking data={persons} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm h-100">
            <SearchSortStats data={persons} />
          </div>
        </div>
      </div>
    </div>
  );
}
