import React from "react";
import { Provider } from "react-redux";
import { cartStore } from "./components/cartStore";
import CartApp from "./components/CartApp";

function App() {
  return (
    <Provider store={cartStore}>
      <CartApp />
    </Provider>
  );
}

export default App;
