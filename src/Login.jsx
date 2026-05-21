import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ users, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const match = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );

    if (!match) {
      setError("Invalid username or password.");
      return;
    }

    onLogin(match);
    navigate("/welcome"); 
  };

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-eyebrow">Welcome back</p>
        <h1 className="card-title">Sign in to<br />your account</h1>
      </div>

      <div className="card-body">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="field">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your_username"
            className={error && !username ? "error-input" : ""}
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button className="btn btn-primary" onClick={handleLogin}>
          Sign In
        </button>

        <div className="divider">or</div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/register")} // ← URL changes to /register
        >
          Create new account
        </button>
      </div>
    </div>
  );
}

export default Login;