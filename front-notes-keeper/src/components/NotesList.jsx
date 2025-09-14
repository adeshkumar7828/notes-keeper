import EditNote from "./EditNote";
import NotesCard from "./NotesCard";
import { useSelector } from "react-redux";

function NotesList() {
  const notesArr = useSelector((state) => state.note.notes);

  return (
    <>
      <h1 className="font-bold text-2xl underline m-4">Your Notes</h1>
      <div className="grid grid-flow-col auto-cols w-auto gap-4">
        {notesArr.map((singleNote, i) => {
          return singleNote.isSelectedForEdit ? (
            <EditNote key={i} noteObj={singleNote} />
          ) : (
            <NotesCard key={singleNote.desc} noteObj={singleNote} />
          );
        })}
      </div>
    </>
  );
}

export default NotesList;
