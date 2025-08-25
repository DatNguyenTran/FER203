import { Card, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishlistContext";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { state: wishlist, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const wished = wishlist.ids.includes(product.id);

  const handleWishlist = () => {
    if (!user) {
      toast.info("Please sign in to save wishlist");
      navigate(`/login?redirect_uri=/product/${product.id}`);
    } else {
      toggleWishlist(product.id);
      toast.success(wished ? "Removed from wishlist" : "Added to wishlist!");
    }
  };

  return (
    <Card className="shadow-sm">
      {product.tags.includes("hot") && (
        <Badge
          bg="danger"
          className="position-absolute m-2"
        >
          HOT
        </Badge>
      )}
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.name}</Card.Text>
        {product.salePrice ? (
          <div>
            <span className="text-muted text-decoration-line-through">
              ${product.price}
            </span>
            <span className="ms-2 text-danger fw-bold">
              ${product.salePrice}
            </span>
          </div>
        ) : (
          <div>${product.price}</div>
        )}
        <div className="d-flex justify-content-between mt-2">
          <Button
            size="sm"
            variant="success"
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart!");
            }}
          >
            Add to Cart
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            as={Link}
            to={`/product/${product.id}`}
          >
            View Details
          </Button>
          <Button
            size="sm"
            variant={wished ? "danger" : "outline-danger"}
            onClick={handleWishlist}
          >
            {wished ? "View Wishlist" : "Wishlist"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProductCard;
