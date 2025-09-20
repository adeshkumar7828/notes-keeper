import "./App.css";
import { NotesHeader, NotesInput, NotesList } from "./components";
import React, { useState } from "react";

// Notes Dashboard (Vite + React + Tailwind + DaisyUI)
// - Primary color: blue (uses DaisyUI btn-primary / indicator classes)
// - Copy this file into your Vite React app (e.g. src/App.jsx)
// - Make sure Tailwind + DaisyUI are configured in your project.

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
  {
    id: "n3",
    title: "Books to read",
    desc: "Clean Code, You Don't Know JS",
    tags: ["reading"],
    updatedAt: "2025-09-05",
  },
  {
    id: "n4",
    title: "Meeting notes",
    desc: "Discuss API contracts and versioning",
    tags: ["work", "urgent"],
    updatedAt: "2025-09-07",
  },
];

function Header({ onOpenNew, onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 border-b border-base-200">
      <div className="flex items-center gap-3">
        <button
          className="btn btn-ghost btn-square lg:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold">Notes Dashboard</h1>
        <span className="text-sm text-muted">— quick overview</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search notes..."
            className="input input-sm input-bordered"
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={onOpenNew}>
          New Note
        </button>
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/100" alt="avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ stats }) {
  return (
    <aside className="w-64 border-r border-base-200 p-4 hidden lg:block">
      <div className="mb-6">
        <h2 className="text-lg font-medium">Workspace</h2>
        <p className="text-sm text-muted">Your personal notes</p>
      </div>

      <div className="space-y-3">
        <button className="btn btn-ghost justify-start w-full">
          All Notes <span className="ml-auto badge">{stats.total}</span>
        </button>
        <button className="btn btn-ghost justify-start w-full">
          Favorites <span className="ml-auto badge">{stats.fav}</span>
        </button>
        <button className="btn btn-ghost justify-start w-full">
          Archived <span className="ml-auto badge">{stats.archived}</span>
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold">Tags</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="badge badge-outline badge-sm">work</span>
          <span className="badge badge-outline badge-sm">personal</span>
          <span className="badge badge-outline badge-sm">urgent</span>
          <span className="badge badge-outline badge-sm">reading</span>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="card bg-base-100 shadow-sm border">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm text-muted">{title}</h4>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <div className="text-3xl text-primary">{icon}</div>
        </div>
      </div>
    </div>
  );
}

function NoteCard({ note, onView }) {
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

function NewNoteModal({ open, onClose, onCreate }) {
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

function Dashboard() {
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
            <Header
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
                    <NoteCard key={n.id} note={n} onView={handleView} />
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <NewNoteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Dashboard;
