function StatsPanel({ totalCourses, visibleCourses, selectedTitle }) {
  return (
    <div className="stats-grid">
      <div className="stat-box">
        <span className="stat-label">Total courses</span>
        <strong>{totalCourses}</strong>
      </div>

      <div className="stat-box">
        <span className="stat-label">Visible courses</span>
        <strong>{visibleCourses}</strong>
      </div>

      <div className="stat-box">
        <span className="stat-label">Selected course</span>
        <strong>{selectedTitle || "None"}</strong>
      </div>
    </div>
  );
}

export default StatsPanel;
