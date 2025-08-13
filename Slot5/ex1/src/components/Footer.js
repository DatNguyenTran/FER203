import React from "react";

function Footer() {
  return (
    <footer
      className="py-4 text-center text-muted"
      id="about"
    >
      <small>
        &copy; {new Date().getFullYear()} RecipeLab — React Bootstrap
      </small>
    </footer>
  );
}

export default Footer;
