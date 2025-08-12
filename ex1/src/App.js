import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Thêm file CSS
import { companies as data } from "./data";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import CategoryFilter from "./components/CategoryFilter";
import CompanyTable from "./components/CompanyTable";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(data);

  const categories = [...new Set(data.map((c) => c.category))];

  const handleSearchClick = () => {
    let result = data.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category) {
      result = result.filter((c) => c.category === category);
    }

    if (sortOption === "start-asc") {
      result.sort((a, b) => a.start - b.start);
    } else if (sortOption === "start-desc") {
      result.sort((a, b) => b.start - a.start);
    } else if (sortOption === "period") {
      result.sort((a, b) => a.end - a.start - (b.end - b.start));
    }

    setFilteredCompanies(result);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary fw-bold">Company List</h2>

      <div className="card p-3 shadow-sm mb-4">
        <div className="row">
          <div className="col-md-5">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearchClick={handleSearchClick}
            />
          </div>
          <div className="col-md-3">
            <SortDropdown
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
          <div className="col-md-4">
            <CategoryFilter
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
            />
          </div>
        </div>
      </div>

      <CompanyTable companies={filteredCompanies} />
    </div>
  );
}

export default App;
