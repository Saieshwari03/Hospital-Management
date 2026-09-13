import { useState } from "react";
import axios from "axios";
import "./Login.css";

const API_URL = "http://localhost:5252";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isRegister) {
        const response = await axios.post(`${API_URL}/auth/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        setMessage(response.data.message || "Registration successful.");
        setIsRegister(false);
        setForm({
          name: "",
          email: form.email,
          password: "",
        });
      } else {
        /*
          Login endpoint will be added to the backend next.
          For now this confirms that the frontend can communicate
          with the MediShield API.
        */
        onLogin();

      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to connect to MediShield API."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="shield">🛡️</div>
        <h1>MediShield AI</h1>
        <p>Healthcare Cybersecurity Platform</p>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
          <p>
            {isRegister
              ? "Create your security administrator account."
              : "Sign in to access the security dashboard."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="admin@hospital.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        {message && <div className="login-message">{message}</div>}

        <div className="switch-auth">
          {isRegister ? "Already have an account?" : "Don't have an account?"}

          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>

      <div className="security-note">
        🔒 Protected healthcare security environment
      </div>
    </div>
  );
}

export default Login;