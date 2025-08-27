import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload });
    },
    removeTodo: (state, action) => state.filter((t) => t.id !== action.payload),
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const todoStore = configureStore({
  reducer: { todos: todoSlice.reducer },
});
