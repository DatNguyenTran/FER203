import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishlistContext";
import AuthContext from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { state: wishlist, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;
  const wished = wishlist.ids.includes(product.id);

  const handleWishlist = () => {
    if (!user) {
      toast.info("Please sign in first");
      return;
    }
    toggleWishlist(product.id);
    toast.success(wished ? "Removed from wishlist" : "Added to wishlist!");
  };

  return (
    <div className="container mt-4">
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{ maxHeight: "300px" }}
      />
      <p>{product.description}</p>
      {product.salePrice ? (
        <div>
          <span className="text-decoration-line-through">${product.price}</span>
          <span className="ms-2 text-danger">${product.salePrice}</span>
        </div>
      ) : (
        <div>${product.price}</div>
      )}
      <Button
        variant="success"
        onClick={() => {
          addToCart(product);
          toast.success("Added to cart!");
        }}
      >
        Add to Cart
      </Button>{" "}
      <Button
        variant={wished ? "danger" : "outline-danger"}
        onClick={handleWishlist}
      >
        {wished ? "Remove Wishlist" : "Add to Wishlist"}
      </Button>
    </div>
  );
}
export default ProductDetail;
