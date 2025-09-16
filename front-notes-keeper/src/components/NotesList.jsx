import { useEffect } from "react";
import EditNote from "./EditNote";
import NotesCard from "./NotesCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../features/notesSlice";

function NotesList() {
  const dispatch = useDispatch();
  const { notes, status, error } = useSelector((state) => state.note);
  console.log(notes);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotes()); // Dispatch the async thunk
    }
  }, [status, dispatch]);

  if (status === "failed") {
    console.log(notes);
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="font-bold text-2xl underline m-4">Your Notes</h1>
      {status === "loading" ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-flow-col auto-cols w-auto gap-4">
          {notes.map((singleNote, i) => {
            return singleNote.isSelectedForEdit ? (
              <EditNote key={i} noteObj={singleNote} />
            ) : (
              <NotesCard key={singleNote.desc} noteObj={singleNote} />
            );
          })}
        </div>
      )}
    </>
  );
}

export default NotesList;
