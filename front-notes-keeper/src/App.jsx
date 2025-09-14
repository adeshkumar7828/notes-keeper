import "./App.css";
import { NotesHeader, NotesInput, NotesList } from "./components";

function App() {
  return (
    <>
      <div className="border-2 border-cyan-600 mb-5 rounded-2xl p-3">
        <NotesHeader />
        <NotesInput />
        <NotesList />
      </div>
    </>
  );
}

export default App;
