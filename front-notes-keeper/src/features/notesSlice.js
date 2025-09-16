import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = `http://localhost:3000/api/notes`;

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async function () {
    const response = await fetch(serverUrl);
    const jsonData = await response.json();
    return jsonData;
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async function (noteData) {
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    const data = await response.json();
    // console.log(data);
    return data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async function (id, { dispatch, rejectWithValue }) {
    // console.log(id);
    try {
      const response = await fetch(serverUrl + "/" + id, {
        method: "DELETE",
      });
      if (response.status === 204) {
        dispatch(removeNote(id));
        return id;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  notes: [
    {
      _id: 1,
      title: "git push",
      desc: "The git push command is used to upload your local commits to a remote repository, such as one hosted on GitHub, GitLab, or Bitbucket.",
      isSelectedForEdit: false,
    },
    {
      _id: 2,
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
        title: action.payload.title,
        desc: action.payload.desc,
      };

      state.notes.push(newNote);
    },
    makeEditable: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.map((el) => {
        if (el._id === id) {
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
        if (el._id === id) {
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
      state.notes = state.notes.filter((el) => {
        return el._id !== id;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = [...state.notes, ...action.payload];
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        // set the logic to get the status that note deleted
        // currently not writing the logic of delete here so that i can  remove the removeNote reducer just because that i have used dispatch directly in thunk that property will also be removed thats why
      })
      .addCase(createNote.fulfilled, (state, action) => {
        // set the logic to get the status that note added
        // console.log(action.payload);
        state.notes = [...state.notes, action.payload];
      });
  },
});

export const { addNote, removeNote, editNote, makeEditable } =
  notesSlice.actions;

export default notesSlice.reducer;
