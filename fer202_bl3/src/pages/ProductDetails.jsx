import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Spinner, Badge } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading product...
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-5">Product not found</p>;
  }

  return (
    <div className="container mt-4">
      <Link
        to="/"
        className="btn btn-outline-secondary mb-3"
      >
        ← Back to Products
      </Link>

      <div
        className="row align-items-center shadow rounded p-4"
        style={{ background: "#fff" }}
      >
        {/* Cột ảnh */}
        <div className="col-md-6 text-center">
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "15px",
              background: "#fafafa",
            }}
          >
            <img
              src={`/${product.image}`}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: "10px",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>

        {/* Cột thông tin */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>

          <h3 className="my-3 text-primary fw-bold">
            ${product.price.toFixed(2)}
          </h3>
          <p>
            <Badge
              bg="dark"
              className="px-3 py-2"
            >
              Category: {product.category}
            </Badge>
          </p>

          <div className="d-flex gap-3 mt-4">
            <Button
              variant="success"
              size="lg"
              className="flex-grow-1 shadow"
            >
              🛒 Add to Cart
            </Button>
            <Button
              variant="outline-danger"
              size="lg"
              className="flex-grow-1 shadow"
            >
              ❤️ Add to Favourites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
