import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = `https://notes-keeper-k8bf.onrender.com/api/notes`;

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(serverUrl);
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async function (noteData, { rejectWithValue }) {
    try {
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
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async function (noteData, { dispatch, rejectWithValue }) {
    try {
      const response = await fetch(serverUrl + "/" + noteData._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      const data = await response.json();
      if (response.status === 200) {
        dispatch(editNote(data));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
  notes: [],
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
      const _id = action.payload._id;

      state.notes = state.notes.map((el) => {
        if (el._id === _id) {
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
        console.log(action);
      })
      .addCase(createNote.fulfilled, (state, action) => {
        // set the logic to get the status that note added
        // console.log(action.payload);
        state.notes = [...state.notes, action.payload];
      });
    // .addCase(updateNote.fulfilled, (state, action) => {
    //   // set the logic to get the status that note updated
    // })
    // .addCase(deleteNote.fulfilled, (state, action) => {
    //   // set the logic to get the status that note deleted
    // });
  },
});

export const { removeNote, editNote, makeEditable } = notesSlice.actions;

export default notesSlice.reducer;
