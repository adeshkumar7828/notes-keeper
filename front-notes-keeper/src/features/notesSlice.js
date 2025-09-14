import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async function () {
    const response = await fetch("http://localhost:3000/api/notes");
    const jsonData = await response.json();
    return jsonData;
  }
);

const initialState = {
  notes: [
    {
      id: 1,
      title: "git push",
      desc: "The git push command is used to upload your local commits to a remote repository, such as one hosted on GitHub, GitLab, or Bitbucket.",
      isSelectedForEdit: false,
    },
    {
      id: 2,
      title: "Proxy(Object)",
      desc: "The output [Proxy(Object)] in your console is a feature of Redux Toolkit and the library it uses internally, Immer. It's the expected behavior when you console.log the state object inside a Redux Toolkit reducer.",
      isSelectedForEdit: false,
    },
  ],
  status: "idle",
  error: null,
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
    makeEditable: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.map((el) => {
        if (el.id === id) {
          el.isSelectedForEdit = true;
          return el;
        } else {
          return el;
        }
      });
    },

    editNote: (state, action) => {
      const id = action.payload.id;

      state.notes = state.notes.map((el) => {
        if (el.id === id) {
          el.title = action.payload.title;
          el.desc = action.payload.desc;
          el.isSelectedForEdit = false;
          return el;
        } else {
          return el;
        }
      });
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addNote, removeNote, editNote, makeEditable } =
  notesSlice.actions;

export default notesSlice.reducer;
