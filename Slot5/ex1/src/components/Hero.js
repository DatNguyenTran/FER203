import React from "react";

export default function Hero() {
  return (
    <section className="hero-section py-5 bg-light">
      <div className="container text-center">
        <h1 className="hero-title display-4 fw-bold text-success mb-4">
          Explore our simple, healthy recipes
        </h1>
        <p className="hero-description lead text-muted mx-auto">
          Discover eight quick, whole-food dishes that fit real-life schedules
          and taste amazing. Use the search bar to find a recipe by name or
          ingredient, or simply scroll the list and let something delicious
          catch your eye.
        </p>
      </div>
    </section>
  );
}
