import { useState } from "react";
import { createNote } from "../features/notesSlice";
import { useDispatch } from "react-redux";

function NotesInput() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();

  function handleEnterNote() {
    dispatch(
      createNote({
        title,
        desc,
      })
    );

    setTitle("");
    setDesc("");
  }

  return (
    <div className="flex justify-center mb-5">
      <fieldset className="fieldset bg-base-200 border-cyan-600 rounded-box w-xs border-2 p-4">
        <label className="label">Title</label>
        <input
          type="email"
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label">Your Note</label>
        <textarea
          className="textarea"
          placeholder="Enter Here..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <button className="btn btn-info mt-4" onClick={handleEnterNote}>
          Enter note
        </button>
      </fieldset>
    </div>
  );
}

export default NotesInput;
