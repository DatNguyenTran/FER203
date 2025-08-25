import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import { toast } from "react-toastify";

function Cart() {
  const { items, removeFromCart, incQty, decQty, subtotal } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.info("Giỏ hàng trống, không thể Checkout!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mt-4">
      <h2>Giỏ hàng</h2>
      {items.length === 0 ? (
        <p>Chưa có sản phẩm nào trong giỏ hàng</p>
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
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
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
                  <td>${p.price}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => decQty(p.id)}
                      size="sm"
                    >
                      -
                    </Button>{" "}
                    {p.qty}{" "}
                    <Button
                      variant="light"
                      onClick={() => incQty(p.id)}
                      size="sm"
                    >
                      +
                    </Button>
                  </td>
                  <td>${p.price * p.qty}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(p.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Tổng: ${subtotal}</h4>
          <Button
            variant="primary"
            onClick={handleCheckout}
          >
            Tiến hành Checkout
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;
