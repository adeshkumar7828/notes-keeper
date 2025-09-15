import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeNote, makeEditable } from "../features/notesSlice";

function NotesCard({ noteObj }) {
  // console.log(noteObj, typeof noteObj);
  const dispatch = useDispatch();
  const note = useSelector((state) => {
    return state.note.notes.find((el) => {
      return el._id === noteObj._id;
    });
  });

  return (
    <div className="card bg-base-100 shadow-sm border-2 border-cyan-600 rounded-2xl">
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p>{note.desc}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-soft btn-info"
            onClick={() => dispatch(makeEditable(noteObj._id))}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => dispatch(removeNote(noteObj._id))}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
