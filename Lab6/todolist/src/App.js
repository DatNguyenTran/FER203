// App.js
import React from "react";
import { Provider } from "react-redux";
import { todoStore } from "./components/todoStore";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <Provider store={todoStore}>
      <TodoApp />
    </Provider>
  );
}

export default App;
