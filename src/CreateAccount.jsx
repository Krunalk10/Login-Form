import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount({ users, onRegister, onLogin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const e = {};

    if (!form.username.trim()) {
      e.username = "Username is required.";
    } else if (
      users.find(
        (u) => u.username.toLowerCase() === form.username.toLowerCase()
      )
    ) {
      e.username = "Username already taken.";
    }

    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }

    if (!form.password) {
      e.password = "Password is required.";
    } else if (form.password.length < 6) {
      e.password = "Minimum 6 characters.";
    }

    return e;
  };

  const handleSignup = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const newUser = { ...form };
    onRegister(newUser);  // add to users[]
    onLogin(newUser);     // set as currentUser
    navigate("/welcome"); // go straight to welcome page
  };

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-eyebrow">Get started</p>
        <h1 className="card-title">Create your<br />account</h1>
      </div>

      <div className="card-body">
        <div className="field">
          <label>Username</label>
          <input
            value={form.username}
            onChange={set("username")}
            placeholder="your_username"
            className={errors.username ? "error-input" : ""}
          />
          {errors.username && (
            <span className="field-error">{errors.username}</span>
          )}
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={set("password")}
            placeholder="Min. 6 characters"
            className={errors.password ? "error-input" : ""}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <button className="btn btn-primary" onClick={handleSignup}>
          Create Account
        </button>

        <div className="divider">already have an account?</div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;