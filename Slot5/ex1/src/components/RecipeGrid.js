import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, onViewRecipe }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">No recipes found</h4>
        <p className="text-muted">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <section className="recipe-grid-section py-4">
      <div className="row g-4">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="col-xs-12 col-md-4 col-lg-4"
          >
            <RecipeCard
              recipe={recipe}
              onViewRecipe={onViewRecipe}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
