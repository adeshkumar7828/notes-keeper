import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: 1,
      title: "Sample Note 1",
      desc: "this is a sample note 1",
    },
    {
      id: 2,
      title: "Sample Note 1",
      desc: "this is a sample not 1",
    },
  ],
};

export const notesSlice = createSlice({
  name: "notesSl",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now(),
        title: action.payload.title,
        desc: action.payload.desc,
      };

      state.notes.push(newNote);
    },
    removeNote: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.notes = state.notes.filter((el) => {
        console.log(el.id !== id);
        return el.id !== id;
      });
      console.log(state.notes);
    },
  },
});

export const { addNote, removeNote } = notesSlice.actions;

export default notesSlice.reducer;
