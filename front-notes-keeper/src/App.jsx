import "./App.css";
import { NotesHeader, NotesInput, NotesList } from "./components";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-start bg-base-200 p-4">
      <div className="w-full max-w-6xl border-2 border-cyan-600 rounded-2xl shadow-lg bg-base-100 p-6">
        <NotesHeader />
        <NotesInput />
        <NotesList />
      </div>
    </div>
  );
}

export default App;
