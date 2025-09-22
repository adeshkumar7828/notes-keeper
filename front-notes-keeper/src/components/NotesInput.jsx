import { useState } from "react";
import { createNote } from "../features/notesSlice";
import { useDispatch } from "react-redux";

function NotesInput() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dispatch = useDispatch();

  function handleEnterNote() {
    if (!title && !desc) return;
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
    <div className="flex justify-center mb-8">
      <fieldset className="fieldset bg-base-100 border border-cyan-500 rounded-xl shadow-sm w-full max-w-md p-6 space-y-4">
        <label className="label font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label font-medium text-gray-700">Your Note</label>
        <textarea
          className="textarea textarea-bordered w-full h-28 resize-none"
          placeholder="Write your note here..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <button className="btn btn-info w-full mt-4" onClick={handleEnterNote}>
          + Add Note
        </button>
      </fieldset>
    </div>
  );
}

export default NotesInput;
