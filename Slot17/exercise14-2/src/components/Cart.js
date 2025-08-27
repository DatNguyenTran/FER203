import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { Card, Button, ListGroup } from "react-bootstrap";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    confirmPayment,
    totalValue,
    isPaid,
  } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <Card className={`mt-4 ${darkMode ? "bg-dark text-light" : ""}`}>
      <Card.Body>
        <Card.Title>🛒 Giỏ hàng</Card.Title>
        {cartItems.length === 0 ? (
          <p>{isPaid ? "✅ Thanh toán thành công!" : "Giỏ hàng trống."}</p>
        ) : (
          <>
            <ListGroup variant={darkMode ? "dark" : "flush"}>
              {cartItems.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className={`d-flex justify-content-between ${
                    darkMode ? "bg-dark text-light border-light" : ""
                  }`}
                >
                  {item.name} - ${item.price}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <hr />
            <p>
              <strong>Tổng số món:</strong> {cartItems.length}
            </p>
            <p>
              <strong>Tổng giá trị:</strong> ${totalValue}
            </p>
            <div className="d-flex gap-2">
              <Button
                variant="warning"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button
                variant="primary"
                onClick={confirmPayment}
              >
                Xác nhận đơn hàng
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Cart;
