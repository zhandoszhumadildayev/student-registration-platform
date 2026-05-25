import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme }from "../context/ThemeContext";


function DashboardLayout() {
  const {
    user,
    logout,
    notifications,
    markNotificationsAsRead
  } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const nickname = user?.fullName || user?.name || "Student";
  const unreadCount = notifications.filter((item) => !item.read).length;

  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      nickname
    )}&background=2563eb&color=fff&bold=true&size=128`;

  return (
    <div className="page">
      <header className="hero-header">
        <div className="hero-left">
          <div className="hero-avatar-wrap">
            <img src={avatarUrl} alt={nickname} className="hero-avatar" />
          </div>

          <div>
            <p className="hero-label">{t.studentPortal}</p>

            <h1>Student Registration Platform</h1>

            <p className="hero-subtitle">{t.subtitle}</p>

            <div className="hero-tags">
              <span className="hero-tag">{t.courses}</span>
              <span className="hero-tag">{t.schedule}</span>
              <span className="hero-tag">
                {t.notifications}: {unreadCount}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <select
            className="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="kk">ҚАЗ</option>
          </select>

          <button
            className="notification-icon-btn"
            type="button"
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
          >
            🔔
            {unreadCount > 0 && <span>{unreadCount}</span>}
          </button>

          <button className="logout-button" onClick={handleLogout}>
            {t.logout}
          </button>
          <button className="theme-toggle-btn" type="button" onClick={toggleTheme}>
  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
</button>
        </div>
      </header>

      {isNotificationsOpen && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-top">
            <h3>{t.notifications}</h3>

            <button
              type="button"
              className="secondary-action"
              onClick={markNotificationsAsRead}
            >
              Mark read
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="muted">No notifications yet.</p>
          ) : (
            <ul className="notification-list">
              {notifications.map((item) => (
                <li
                  key={item.id}
                  className={item.read ? "notification-read" : ""}
                >
                  <strong>{item.text}</strong>
                  <span>{item.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <nav className="nav nav-modern">
        <NavLink to="/dashboard" end className="nav-link">
          {t.dashboard}
        </NavLink>

        <NavLink to="/dashboard/courses" className="nav-link">
          {t.courses}
        </NavLink>

        <NavLink to="/dashboard/schedule" className="nav-link">
          {t.schedule}
        </NavLink>

        <NavLink to="/dashboard/profile" className="nav-link">
          {t.profile}
        </NavLink>
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;