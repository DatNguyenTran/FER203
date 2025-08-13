import React from "react";
import { Row, Col } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onViewRecipe, onAddFavourite }) {
  return (
    <Row
      xs={1}
      md={2}
      lg={3}
      className="g-4"
    >
      {recipes.map((recipe, index) => (
        <Col key={index}>
          <RecipeCard
            recipe={recipe}
            onViewRecipe={onViewRecipe}
            onAddFavourite={onAddFavourite}
          />
        </Col>
      ))}
    </Row>
  );
}

export default RecipeList;
