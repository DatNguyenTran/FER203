import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { FaEye, FaCartPlus, FaHeart } from "react-icons/fa";
import { formatPrice } from "../utils/format";

const ProductCard = ({
  product,
  onAddToCart,
  onToggleFavourite,
  isFavourite,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => navigate(`/product/${product.id}`);
  const handleAddToCart = () => onAddToCart(product);
  const handleToggleFavourite = () => onToggleFavourite(product);

  return (
    <Card
      className="h-100 shadow-sm border-0"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Ảnh sản phẩm */}
      <div style={{ background: "#fafafa", textAlign: "center" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      {/* Thông tin */}
      <Card.Body className="d-flex flex-column">
        <h6 className="fw-bold">{product.name}</h6>
        <p className="text-muted small flex-grow-1">
          {product.description.substring(0, 60)}...
        </p>

        <div className="mb-3">
          <Badge
            bg="primary"
            className="fs-6"
          >
            {formatPrice(product.price)}
          </Badge>
        </div>

        {/* Nút hành động xếp dọc cho đẹp */}
        <div className="d-grid gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleViewDetails}
          >
            <FaEye className="me-1" />
            View Details
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleAddToCart}
          >
            <FaCartPlus className="me-1" />
            Add to Cart
          </Button>
          <Button
            variant={isFavourite ? "danger" : "outline-danger"}
            size="sm"
            onClick={handleToggleFavourite}
          >
            <FaHeart className="me-1" />
            {isFavourite ? "Favourited" : "Favourite"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
