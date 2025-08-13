import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaHeart, FaUsers, FaClock, FaUtensils } from "react-icons/fa";

function RecipeCard({ recipe, onViewRecipe, onAddFavourite }) {
  const fallback = "/images/fallback.jpg";

  return (
    <Card className="h-100 d-flex flex-column shadow-sm">
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={recipe.image}
          alt={recipe.title}
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text className="text-muted">{recipe.description}</Card.Text>

        <div className="small mb-3">
          <FaUsers className="me-1" /> {recipe.servings} &nbsp;|&nbsp;
          <FaClock className="ms-2 me-1" /> Prep {recipe.prep}’ &nbsp;|&nbsp;
          <FaUtensils className="ms-2 me-1" /> Cook {recipe.cook}’
        </div>

        <div className="mt-auto d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => onViewRecipe(recipe)}
          >
            View Recipe
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => onAddFavourite(recipe)}
          >
            <FaHeart className="me-1" /> Add to Favourite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
