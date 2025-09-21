import { useState } from "react";
// import { createNote } from "../features/notesSlice";
// import { useDispatch } from "react-redux";

function NotesInput({ open, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="bg-base-100 w-full max-w-md rounded-lg shadow-lg p-6 relative z-10">
        <h3 className="text-xl font-semibold mb-4">Create Note</h3>
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Title"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            rows={4}
          ></textarea>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onCreate({
                id: Date.now().toString(),
                title,
                desc,
                tags: [],
                updatedAt: new Date().toLocaleDateString(),
              });
              setTitle("");
              setDesc("");
              onClose();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

// function NotesInput() {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");

//   const dispatch = useDispatch();

//   function handleEnterNote() {
//     if (!title && !desc) return;
//     dispatch(
//       createNote({
//         title,
//         desc,
//       })
//     );

//     setTitle("");
//     setDesc("");
//   }

//   return (
//     <div className="flex justify-center mb-5">
//       <fieldset className="fieldset bg-base-200 border-cyan-600 rounded-box w-xs border-2 p-4">
//         <label className="label">Title</label>
//         <input
//           type="email"
//           className="input"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <label className="label">Your Note</label>
//         <textarea
//           className="textarea"
//           placeholder="Enter Here..."
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         ></textarea>

//         <button className="btn btn-info mt-4" onClick={handleEnterNote}>
//           Enter note
//         </button>
//       </fieldset>
//     </div>
//   );
// }

export default NotesInput;
