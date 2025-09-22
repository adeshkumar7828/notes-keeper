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
        <h1 className="font-bold text-2xl text-cyan-700 underline mb-4 ml-4">
          Your Notes
        </h1>
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
      <h1 className="font-bold text-2xl text-cyan-700 underline mb-4 ml-4">
        Your Notes
      </h1>
      {status === "loading" ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-info"></span>
        </div>
      ) : status === "failed" ? (
        <div role="alert" className="alert alert-error shadow-lg my-4 mx-6">
          <span>Error! Request {error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((singleNote, i) =>
            singleNote.isSelectedForEdit ? (
              <EditNote key={i} noteObj={singleNote} />
            ) : (
              <NotesCard key={singleNote._id} noteObj={singleNote} />
            )
          )}
        </div>
      )}
    </>
  );
}

export default NotesList;
