import "./App.css";
import {
  NotesHeader,
  NotesInput,
  NotesList,
  Sidebar,
  NotesCard,
  StatCard,
} from "./components";
import { useState } from "react";

const sampleNotes = [
  {
    id: "n1",
    title: "Grocery list",
    desc: "Milk, Eggs, Bread, Butter",
    tags: ["personal"],
    updatedAt: "2025-09-01",
  },
  {
    id: "n2",
    title: "Project ideas",
    desc: "Build notes app with offline sync",
    tags: ["work"],
    updatedAt: "2025-09-03",
  },
];

function App() {
  const [notes, setNotes] = useState(sampleNotes);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const stats = {
    total: notes.length,
    fav: 0,
    archived: 0,
  };

  function handleCreate(note) {
    setNotes((s) => [note, ...s]);
  }

  function handleView(id) {
    alert("View note: " + id);
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          {/* Sidebar (hidden on small screens) */}
          <div
            className={`transition-all duration-200 ${
              sidebarOpen ? "block" : "hidden"
            } lg:block`}
          >
            <Sidebar stats={stats} />
          </div>

          <div className="flex-1">
            <NotesHeader
              onOpenNew={() => setModalOpen(true)}
              onToggleSidebar={() => setSidebarOpen((s) => !s)}
            />

            <main className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <StatCard title="Total" value={stats.total} icon="📄" />
                <StatCard title="Favorites" value={stats.fav} icon="⭐" />
                <StatCard title="Archived" value={stats.archived} icon="🗄️" />
              </div>

              <section>
                <h2 className="text-lg font-semibold mb-3">Your Notes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {notes.map((n) => (
                    <NotesCard key={n.id} note={n} onView={handleView} />
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <NotesInput
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default App;
