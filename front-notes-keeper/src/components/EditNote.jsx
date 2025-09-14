import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../features/notesSlice.js";

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
      id: noteObj.id,
      title: editTitle,
      desc: editDesc,
    };

    dispatch(editNote(editedNote));
  }

  return (
    <div className="card bg-base-100 shadow-sm border-2 border-cyan-600 rounded-2xl">
      <div className="card-body">
        <input
          type="email"
          className="input"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
          }}
        />
        <textarea
          className="textarea"
          value={editDesc}
          onChange={(e) => {
            setEditDesc(e.target.value);
          }}
        ></textarea>
        <div className="card-actions justify-end">
          <button
            className="btn btn-soft btn-info"
            onClick={() => handleEditNoteSaveButton()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
