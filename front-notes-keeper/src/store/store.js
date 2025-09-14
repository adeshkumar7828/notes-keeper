import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notesSlice.js";

const store = configureStore({
  reducer: {
    note: notesReducer,
  },
});

export { store };
