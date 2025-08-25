import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Checkout() {
  const { items, subtotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.info("Bạn cần đăng nhập để Checkout");
      navigate("/login?redirect_uri=/checkout");
      return;
    }
    if (items.length === 0) {
      toast.error("Không có sản phẩm để đặt hàng!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userId: user.id,
      items: items,
      total: subtotal,
      date: new Date().toLocaleString(),
    };

    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    toast.success("Đặt hàng thành công!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      {items.length === 0 ? (
        <p>Không có sản phẩm để thanh toán.</p>
      ) : (
        <>
          <Table
            bordered
            hover
            responsive
          >
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ height: "60px" }}
                    />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.qty}</td>
                  <td>${p.price}</td>
                  <td>${p.price * p.qty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Tổng cộng: ${subtotal}</h4>
          <Button
            variant="success"
            onClick={handlePlaceOrder}
          >
            Xác nhận đặt hàng
          </Button>
        </>
      )}
    </div>
  );
}

export default Checkout;
