import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useMemo, useEffect } from "react";
import CustomNavbar from "./components/CustomNavbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import SortDropdown from "./components/SortDropdown";
import StudentGrid from "./components/StudentGrid";
import StudentDetailModal from "./components/StudentDetailModal";
import ProfileWizardModal from "./components/ProfileWizardModal";
import Footer from "./components/Footer";
import { students } from "./students";

const getProfilesFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("userProfiles") || "[]");
  } catch (error) {
    console.error("Error loading profiles from localStorage:", error);
    return [];
  }
};

const deleteProfileFromLocalStorage = (profileId) => {
  try {
    const existingProfiles = getProfilesFromLocalStorage();
    const updatedProfiles = existingProfiles.filter(
      (profile) => profile.id !== profileId
    );
    localStorage.setItem("userProfiles", JSON.stringify(updatedProfiles));
    return true;
  } catch (error) {
    console.error("Error deleting profile from localStorage:", error);
    return false;
  }
};

function App() {
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProfileWizard, setShowProfileWizard] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);

  useEffect(() => {
    const profiles = getProfilesFromLocalStorage();
    setSavedProfiles(profiles);
  }, []);

  const allStudentsAndProfiles = useMemo(() => {
    const profileStudents = savedProfiles.map((profile) => ({
      id: profile.id,
      name: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      age: 25,
      grade: "Profile",
      avatar: profile.avatar,
      isProfile: true,
      profile: profile,
    }));

    const combined = [...students, ...profileStudents];

    let filtered = combined.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      const matchesAgeFilter =
        ageFilter === "" || item.age.toString() === ageFilter;
      const matchesAvatarFilter = !hasAvatar || item.avatar;

      return matchesSearch && matchesAgeFilter && matchesAvatarFilter;
    });

    if (sort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "age") {
      filtered.sort((a, b) => a.age - b.age);
    } else if (sort === "grade") {
      filtered.sort((a, b) => a.grade.localeCompare(b.grade));
    }

    return filtered;
  }, [students, savedProfiles, search, ageFilter, hasAvatar, sort]);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleShowProfileWizard = () => {
    setShowProfileWizard(true);
  };

  const handleCloseProfileWizard = () => {
    setShowProfileWizard(false);
  };

  const handleProfileSaved = (newProfile) => {
    setSavedProfiles((prev) => [...prev, newProfile]);
  };

  const handleDeleteProfile = (profileId) => {
    if (deleteProfileFromLocalStorage(profileId)) {
      setSavedProfiles((prev) =>
        prev.filter((profile) => profile.id !== profileId)
      );
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbar
        search={search}
        setSearch={setSearch}
        onShowProfileWizard={handleShowProfileWizard}
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
            <h3>Students ({allStudentsAndProfiles.length})</h3>
            <SortDropdown
              sort={sort}
              setSort={setSort}
            />
          </div>

          <StudentGrid
            students={allStudentsAndProfiles}
            onViewDetails={handleViewDetails}
            onDeleteProfile={handleDeleteProfile}
          />
        </div>
      </main>

      <StudentDetailModal
        show={showModal}
        onHide={handleCloseModal}
        student={selectedStudent}
      />

      <ProfileWizardModal
        show={showProfileWizard}
        onHide={handleCloseProfileWizard}
        onProfileSaved={handleProfileSaved}
      />

      <Footer />
    </div>
  );
}

export default App;
