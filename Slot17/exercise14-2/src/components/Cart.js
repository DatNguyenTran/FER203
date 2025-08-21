import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    confirmPayment,
    totalValue,
    isPaid,
  } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>
          {isPaid
            ? "✅ Thanh toán thành công!"
            : "Giỏ hàng của bạn đang trống."}
        </p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} - ${item.price}
                </span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <p>
              <strong>Tổng số món:</strong> {cartItems.length}
            </p>
            <p>
              <strong>Tổng giá trị:</strong> ${totalValue}
            </p>
          </div>
          <div className="cart-actions">
            <button
              className="clear-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              className="confirm-btn"
              onClick={confirmPayment}
            >
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
