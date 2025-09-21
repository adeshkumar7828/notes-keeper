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
    return (
      <>
        <h1 className="font-bold text-2xl underline m-4">Your Notes</h1>
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Request {error}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="font-bold text-2xl underline m-4">Your Notes</h1>
      {status === "loading" ? (
        <div>
          <span className="loading loading-spinner loading-xl"></span>
        </div>
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
