import React, { useContext } from "react";
import { CartContext } from "./GlobalContext";
import { Container, Table, Button } from "react-bootstrap";

function CartPage() {
  const { cart, cartDispatch } = useContext(CartContext);

  const handleRemove = (item) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: item.id });
  };

  const handleUpdateQty = (item, qty) => {
    if (qty < 1) return;
    cartDispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty } });
  };

  const total = cart.reduce(
    (sum, i) => sum + i.qty * parseFloat(i.price.replace("$", "")),
    0
  );

  return (
    <Container className="mt-4">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <Table
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Model</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.model}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      handleUpdateQty(item, parseInt(e.target.value))
                    }
                    style={{ width: "60px" }}
                  />
                </td>
                <td>${item.qty * parseFloat(item.price.replace("$", ""))}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="3"
                className="text-end"
              >
                <strong>Total:</strong>
              </td>
              <td colSpan="2">
                <strong>${total}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default CartPage;
