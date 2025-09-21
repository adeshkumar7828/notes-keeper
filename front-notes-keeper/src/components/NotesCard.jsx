// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { makeEditable, deleteNote } from "../features/notesSlice";

function NotesCard({ note, onView }) {
  return (
    <div className="card bg-base-100 shadow-sm border hover:shadow-md transition p-3">
      <div className="card-body p-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="card-title text-lg">{note.title}</h3>
            <p className="text-sm text-muted line-clamp-3 mt-1">{note.desc}</p>
            <div className="flex gap-2 mt-3">
              {note.tags.map((t) => (
                <div key={t} className="badge badge-outline badge-sm">
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted text-right">
            <div>{note.updatedAt}</div>
            <button
              className="btn btn-ghost btn-xs mt-3"
              onClick={() => onView(note.id)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// function NotesCard({ noteObj }) {
//   // console.log(noteObj._id);
//   const dispatch = useDispatch();
//   const note = useSelector((state) => {
//     return state.note.notes.find((el) => {
//       return el._id === noteObj._id;
//     });
//   });

//   function handleDeleteNote() {
//     dispatch(deleteNote(noteObj._id));
//   }

//   return (
//     <div className="card bg-base-100 shadow-sm border-2 border-cyan-600 rounded-2xl">
//       <div className="card-body">
//         <h2 className="card-title">{note.title}</h2>
//         <p>{note.desc}</p>
//         <div className="card-actions justify-end">
//           <button
//             className="btn btn-soft btn-info"
//             onClick={() => dispatch(makeEditable(noteObj._id))}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={handleDeleteNote}
//           >
//             ✕
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default NotesCard;
