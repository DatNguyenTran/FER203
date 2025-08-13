import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

function RecipeModal({ show, onHide, recipe, onAddToCart }) {
  if (!recipe) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="img-fluid rounded mb-3"
          onError={(e) => {
            e.currentTarget.src = "/images/fallback.jpg";
          }}
        />
        <p>{recipe.description}</p>
        <ListGroup>
          <ListGroup.Item>
            <strong>Servings:</strong> {recipe.servings}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Prep:</strong> {recipe.prep} mins
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Cook:</strong> {recipe.cook} mins
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => onAddToCart(recipe)}
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
