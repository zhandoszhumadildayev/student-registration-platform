import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import NotificationsPanel from "../components/NotificationsPanel";

function DashboardHomePage() {
  const { user } = useAuth();
  const [customCourses] = useLocalStorage("custom_courses", []);
  const [lastLogin] = useLocalStorage("last_login", new Date().toLocaleString());

  const profileCompletion = user?.name && user?.email ? 80 : 40;

  return (
    <section className="dashboard-home-modern">
      <div className="welcome-card-modern">
        <div>
          <p className="welcome-label">Welcome back</p>
          <h2>Hello, {user?.name}</h2>
          <p className="welcome-text">
            Here you can view your profile, manage courses, and check your student information.
          </p>
        </div>

        <div className="welcome-buttons">
          <Link to="/dashboard/courses" className="link-button">
            Go to courses
          </Link>
          <Link to="/dashboard/profile" className="secondary-link-button">
            Open profile
          </Link>
        </div>
      </div>

      <div className="quick-stats-grid">
        <div className="quick-stat-card">
          <span className="quick-stat-label">Total courses</span>
          <strong>12+ API</strong>
        </div>

        <div className="quick-stat-card">
          <span className="quick-stat-label">Custom courses</span>
          <strong>{customCourses.length}</strong>
        </div>

        <div className="quick-stat-card">
          <span className="quick-stat-label">Selected area</span>
          <strong>Dashboard</strong>
        </div>

        <div className="quick-stat-card">
          <span className="quick-stat-label">Last login</span>
          <strong>{lastLogin}</strong>
        </div>
      </div>

      <div className="dashboard-extra-grid">
        <div className="dashboard-widget">
          <div className="widget-top">
            <div>
              <p className="widget-label">Profile completion</p>
              <h3>{profileCompletion}% completed</h3>
              <NotificationsPanel />
            </div>
            <span className="widget-icon">👤</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>

          <p className="widget-text">
            Add or update your profile information to make your account complete.
          </p>

          <Link to="/dashboard/profile" className="small-link">
            Edit profile
          </Link>
        </div>

        <div className="dashboard-widget">
          <div className="widget-top">
            <div>
              <p className="widget-label">Quick actions</p>
              <h3>Fast access</h3>
            </div>
            <span className="widget-icon">⚡</span>
          </div>

          <div className="quick-action-list">
            <Link to="/dashboard/courses" className="quick-action-btn">
              Add course
            </Link>
            <Link to="/dashboard/courses" className="quick-action-btn">
              Search courses
            </Link>
            <Link to="/dashboard/profile" className="quick-action-btn">
              Update profile
            </Link>
          </div>
        </div>

        <div className="dashboard-widget">
          <div className="widget-top">
            <div>
              <p className="widget-label">Recent activity</p>
              <h3>Latest actions</h3>
            </div>
            <span className="widget-icon">🕒</span>
          </div>

          <ul className="activity-list">
            <li>Logged in successfully</li>
            <li>Opened dashboard page</li>
            <li>Custom courses: {customCourses.length}</li>
            <li>Last login: {lastLogin}</li>
          </ul>
        </div>
      </div>

      <div className="action-cards-grid">
        <Link to="/dashboard/courses" className="action-card-modern">
          <div className="action-icon">📚</div>
          <h3>Manage courses</h3>
          <p>View available courses, search courses, and add your own course.</p>
        </Link>

        <Link to="/dashboard/profile" className="action-card-modern">
          <div className="action-icon">👤</div>
          <h3>Profile overview</h3>
          <p>View your name, email, role, and student status.</p>
        </Link>

        <Link to="/dashboard/courses" className="action-card-modern">
          <div className="action-icon">➕</div>
          <h3>Add new course</h3>
          <p>Add a new course with title, category, and description.</p>
        </Link>
      </div>
    </section>
  );
}

export default DashboardHomePage;