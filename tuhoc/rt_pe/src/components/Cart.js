import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Table, Form } from "react-bootstrap";

function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>🛒 Giỏ hàng trống</p>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
          >
            <thead className="table-dark">
              <tr>
                <th>Model</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.brand} {item.model}
                  </td>
                  <td>{item.price}</td>
                  <td style={{ width: "120px" }}>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_QTY",
                          payload: { id: item.id, qty: Number(e.target.value) },
                        })
                      }
                    />
                  </td>
                  <td>${(item.priceValue * item.qty).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        dispatch({ type: "REMOVE", payload: item.id })
                      }
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center">
            <h4>Total: ${total.toFixed(2)}</h4>
            <Button variant="success">Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
