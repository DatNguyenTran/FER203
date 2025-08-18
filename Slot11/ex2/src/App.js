import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useMemo } from "react";
import CustomNavbar from "./components/CustomNavbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import SortDropdown from "./components/SortDropdown";
import StudentGrid from "./components/StudentGrid";
import StudentDetailModal from "./components/StudentDetailModal";
import Footer from "./components/Footer";
import { students } from "./students";

function App() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter((student) => {
      const matchSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchAge = (() => {
        switch (ageFilter) {
          case "≤20":
            return student.age <= 20;
          case "21-25":
            return student.age >= 21 && student.age <= 25;
          case ">25":
            return student.age > 25;
          default:
            return true;
        }
      })();

      const matchAvatar = !hasAvatar || (hasAvatar && student.avatar);

      return matchSearch && matchAge && matchAvatar;
    });

    // Sorting
    switch (sort) {
      case "age-asc":
        filtered.sort((a, b) => a.age - b.age);
        break;
      case "age-desc":
        filtered.sort((a, b) => b.age - a.age);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [search, ageFilter, hasAvatar, sort]);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbar
        search={search}
        setSearch={setSearch}
      />
      <Hero />

      <main className="flex-grow-1">
        <div className="container my-4">
          <Filters
            search={search}
            setSearch={setSearch}
            ageFilter={ageFilter}
            setAgeFilter={setAgeFilter}
            hasAvatar={hasAvatar}
            setHasAvatar={setHasAvatar}
          />

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Students ({filteredAndSortedStudents.length})</h3>
            <SortDropdown
              sort={sort}
              setSort={setSort}
            />
          </div>

          <StudentGrid
            students={filteredAndSortedStudents}
            onViewDetails={handleViewDetails}
          />
        </div>
      </main>

      <StudentDetailModal
        show={showModal}
        onHide={handleCloseModal}
        student={selectedStudent}
      />

      <Footer />
    </div>
  );
}

export default App;
