import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLastLogin] = useLocalStorage("last_login", "");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    document.title = "Login | Student Registration Platform";
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    login({ email });
    setLastLogin(new Date().toLocaleString());
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page-modern">
      <div className="login-left-panel">
        <p className="login-kicker">Student portal</p>
        <h1>Student Registration Platform</h1>
        <p className="login-description">
          Sign in to manage your profile, courses, and registration information.
        </p>

        <div className="login-feature-list">
          <div className="login-feature-item">
            <span>🛡️</span>
            <p>Secure access to your student dashboard</p>
          </div>
          <div className="login-feature-item">
            <span>⚡</span>
            <p>Course list and student information</p>
          </div>
          <div className="login-feature-item">
            <span>💾</span>
            <p>Your data is saved in the browser</p>
          </div>
        </div>
      </div>

      <form className="login-card-modern" onSubmit={handleSubmit}>
        <div className="login-avatar-circle">ZH</div>

        <h2>Sign in</h2>
        <p className="muted">Enter your email and password to continue.</p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="student@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="123456"
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="login-submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;