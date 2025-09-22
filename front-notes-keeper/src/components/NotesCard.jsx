import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeEditable, deleteNote } from "../features/notesSlice";

function NotesCard({ noteObj }) {
  // console.log(noteObj._id);
  const dispatch = useDispatch();
  const note = useSelector((state) => {
    return state.note.notes.find((el) => {
      return el._id === noteObj._id;
    });
  });

  function handleDeleteNote() {
    dispatch(deleteNote(noteObj._id));
  }

  return (
    <div className="card bg-base-100 shadow-md border border-cyan-500 rounded-xl transition hover:shadow-lg hover:scale-[1.02]">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold text-cyan-700">
          {note.title}
        </h2>
        <p className="text-gray-600">{note.desc}</p>
        <div className="card-actions justify-between mt-3">
          <button
            className="btn btn-sm btn-outline btn-info"
            onClick={() => dispatch(makeEditable(noteObj._id))}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-100"
            onClick={handleDeleteNote}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
