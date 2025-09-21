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

export default Sidebar;
