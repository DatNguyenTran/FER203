import { useContext, useEffect, useState } from "react";
import WishlistContext from "../contexts/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { state } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const wishedProducts = products.filter((p) => state.ids.includes(p.id));

  return (
    <div className="container mt-4">
      <h2>Your Wishlist</h2>
      <div className="grid">
        {wishedProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
          />
        ))}
      </div>
    </div>
  );
}
export default Wishlist;
