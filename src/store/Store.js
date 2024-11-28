// import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "../features/TodoSlice";
// export const store = configureStore({
//     reducer : todoReducer

// })

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/TodoSlice';

export const store = configureStore({
  reducer: todosReducer
});

export default store;
