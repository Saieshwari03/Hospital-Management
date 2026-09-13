
import "./Login.css";
import MediShieldLogo from "./MediShieldLogo";

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend authentication
    onLogin();
  };

  return (
    <div className="auth-page">

      {/* =====================================
          FUTURISTIC BACKGROUND
      ====================================== */}

      <div className="cyber-grid"></div>
      <div className="scan-line"></div>

      {/* =====================================
          LEFT VISUAL SECTION
      ====================================== */}

      <div className="auth-visual">

        <div className="orbit orbit-one"></div>
        <div className="orbit orbit-two"></div>
        <div className="orbit orbit-three"></div>

        {/* Shield */}

        <div className="shield-3d">

          <div className="shield-core">

            <div className="shield-icon">
              <svg
                viewBox="0 0 100 110"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 5L91 20V49C91 75 75 94 50 105C25 94 9 75 9 49V20Z"
                  fill="rgba(10,35,48,.95)"
                  stroke="#4df4ff"
                  strokeWidth="3"
                />

                <path
                  d="M43 29H57V43H71V57H57V71H43V57H29V43H43Z"
                  fill="#ffffff"
                />

                <path
                  d="M27 67H37L42 61L47 74L53 51L58 67H73"
                  fill="none"
                  stroke="#4df4ff"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="pulse-ring"></div>

          </div>

        </div>

        {/* ECG */}

        <div className="medical-pulse">
          ──╱╲──╱╲╱╲──
        </div>

        {/* Brand */}

        <div className="visual-title">
          <MediShieldLogo />
        </div>

        {/* System Status */}

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM PROTECTED
        </div>

      </div>

      {/* =====================================
          LOGIN SECTION
      ====================================== */}

      <div className="auth-container">

        <div className="auth-card">

          {/* Header */}

          <div className="auth-header">

            <div className="login-brand">
              <MediShieldLogo compact />
            </div>

            <div className="login-heading">

              <span className="system-label">
                MEDISHIELD // SECURE ACCESS
              </span>

              <h2>
                Welcome Back
              </h2>

              <p>
                Access the healthcare security command center
              </p>

            </div>

          </div>

          {/* Login Form */}

          <form onSubmit={handleSubmit}>

            {/* Email */}

            <div className="input-group">

              <label>
                EMAIL ADDRESS
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="security@hospital.com"
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div className="input-group">

              <label>
                PASSWORD
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔐
                </span>

                <input
                  type="password"
                  placeholder="Enter secure password"
                  required
                />

              </div>

            </div>

            {/* Remember / Forgot */}

            <div className="form-options">

              <label className="remember">

                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>

              </label>

              <button
                type="button"
                className="forgot"
              >
                Forgot password?
              </button>

            </div>

            {/* Login Button */}

            <button
              className="auth-button"
              type="submit"
            >

              <span>
                ENTER COMMAND CENTER
              </span>

              <b>
                →
              </b>

            </button>

          </form>

          {/* Security Channel */}

          <div className="divider">
            <span>
              SECURE CHANNEL
            </span>
          </div>

          {/* Security Footer */}

          <div className="security-footer">

            <span>
              ● ENCRYPTED
            </span>

            <span>
              ● JWT SECURED
            </span>

            <span>
              ● HIPAA READY
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
