import { useAuth } from "../context/AuthContext";

function NotificationsPanel() {
  const { notifications, markNotificationsAsRead } = useAuth();

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="notifications-panel">
      <div className="notifications-top">
        <div>
          <p className="widget-label">Notifications</p>
          <h3>{unreadCount} unread</h3>
        </div>

        <button className="secondary-action" type="button" onClick={markNotificationsAsRead}>
          Mark read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="muted">No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((item) => (
            <li key={item.id} className={item.read ? "notification-read" : ""}>
              <strong>{item.text}</strong>
              <span>{item.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationsPanel;