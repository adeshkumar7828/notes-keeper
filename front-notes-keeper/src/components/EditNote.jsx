import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../features/notesSlice.js";

function EditNote({ noteObj }) {
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setEditTitle(noteObj.title);
    setEditDesc(noteObj.desc);
  }, []);

  function handleEditNoteSaveButton() {
    const editedNote = {
      _id: noteObj._id,
      title: editTitle,
      desc: editDesc,
    };
    dispatch(updateNote(editedNote));
  }

  return (
    <div className="card bg-base-100 shadow-md border border-cyan-500 rounded-xl transition-transform hover:scale-[1.02]">
      <div className="card-body space-y-3">
        <input
          type="text"
          className="input input-bordered w-full"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full h-32 resize-none"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />
        <div className="card-actions justify-end">
          <button
            className="btn btn-info btn-sm"
            onClick={handleEditNoteSaveButton}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
