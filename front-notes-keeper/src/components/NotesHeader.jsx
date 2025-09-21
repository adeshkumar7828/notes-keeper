function NotesHeader({ onOpenNew, onToggleSidebar }) {
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

export default NotesHeader;
