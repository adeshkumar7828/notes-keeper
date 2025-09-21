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

export default StatCard;
