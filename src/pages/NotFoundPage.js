import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>404</h1>
        <p className="muted">Page not found.</p>
        <Link className="link-button" to="/login">
          Go to login
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
