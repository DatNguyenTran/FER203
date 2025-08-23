import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useToast } from "../context/ToastContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavourites, isInFavourites } = useFavourites();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    addToast("Added to cart", "success");
  };

  const handleAddToFavourites = () => {
    if (isInFavourites(product.id)) {
      navigate("/favourites");
    } else {
      addToFavourites(product);
      addToast("Added to favourites", "success");
    }
  };

  return (
    <Card className="h-100 product-card position-relative">
      {/* Product Image with Overlay */}
      <div className="product-image-container position-relative overflow-hidden">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay">
          <div className="product-actions">
            <Button
              variant="light"
              size="sm"
              className="action-btn"
              onClick={handleAddToCart}
            >
              🛒
            </Button>
            <Button
              variant="light"
              size="sm"
              className="action-btn"
              onClick={handleAddToFavourites}
            >
              {isInFavourites(product.id) ? "❤️" : "🤍"}
            </Button>
          </div>
        </div>
      </div>

      <Card.Body className="d-flex flex-column p-4">
        {/* Product Title with gradient effect */}
        <Card.Title className="product-title mb-3">{product.name}</Card.Title>

        {/* Product Description with better contrast */}
        <Card.Text className="product-description flex-grow-1 mb-3">
          {product.description}
        </Card.Text>

        {/* Rating and Category Badges */}
        <div className="product-badges mb-3">
          <Badge
            bg="primary"
            className="rating-badge me-2"
          >
            ⭐ {product.rating} ({product.reviews})
          </Badge>
          <Badge
            bg="secondary"
            className="category-badge"
          >
            {product.category}
          </Badge>
        </div>

        {/* Price with enhanced styling */}
        <div className="price-container mb-4">
          <span className="product-price">${product.price}</span>
          <span className="price-label">USD</span>
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <Button
            variant="outline-primary"
            as={Link}
            to={`/product/${product.id}`}
            className="action-button"
          >
            🔍 View Details
          </Button>

          <Button
            variant="success"
            onClick={handleAddToCart}
            className="action-button"
          >
            🛒 Add to Cart
          </Button>

          <Button
            variant={isInFavourites(product.id) ? "warning" : "outline-danger"}
            onClick={handleAddToFavourites}
            className="action-button"
          >
            {isInFavourites(product.id)
              ? "❤️ Go to Favourites"
              : "🤍 Add to Favourites"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
