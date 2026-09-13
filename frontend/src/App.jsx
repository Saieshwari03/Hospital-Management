import { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    securityScore: 0,
    criticalThreats: 0,
    vulnerabilities: 0,
    securityEvents: 0,
  });

  useEffect(() => {
    if (authenticated) {
      fetch("http://localhost:5252/api/dashboard")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch dashboard data");
          }

          return response.json();
        })
        .then((data) => {
          console.log("Dashboard data received:", data);
          setDashboardData(data);
        })
        .catch((error) => {
          console.error("Dashboard API Error:", error);
        });
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <Login
        onLogin={() => {
          setAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🛡️</div>

          <div>
            <h2>MediShield</h2>
            <span>AI Security</span>
          </div>
        </div>

        <nav>
          <button className="nav-item active">
            ▣ <span>Dashboard</span>
          </button>

          <button className="nav-item">
            ⚠ <span>Vulnerabilities</span>
          </button>

          <button className="nav-item">
            ◉ <span>Threat Intelligence</span>
          </button>

          <button className="nav-item">
            ◈ <span>Security Events</span>
          </button>

          <button className="nav-item">
            ♙ <span>Users</span>
          </button>

          <button className="nav-item">
            ☷ <span>Audit Logs</span>
          </button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Healthcare Cybersecurity Management Platform</p>
          </div>

          <div className="profile">
            <div className="avatar">S</div>

            <div>
              <strong>Security Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <section className="content">
          <div className="welcome">
            <div>
              <h2>Hospital Security Overview</h2>

              <p>
                Monitor and manage your healthcare infrastructure security.
              </p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Security Score</span>

              <strong>
                {dashboardData.securityScore}%
              </strong>

              <small>Good</small>
            </div>

            <div className="stat-card">
              <span>Critical Threats</span>

              <strong>
                {dashboardData.criticalThreats}
              </strong>

              <small>Needs Attention</small>
            </div>

            <div className="stat-card">
              <span>Vulnerabilities</span>

              <strong>
                {dashboardData.vulnerabilities}
              </strong>

              <small>Active</small>
            </div>

            <div className="stat-card">
              <span>Security Events</span>

              <strong>
                {dashboardData.securityEvents}
              </strong>

              <small>This Month</small>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="panel">
              <div className="panel-header">
                <h3>Threat Overview</h3>

                <span>Last 30 days</span>
              </div>

              <div className="threat-list">
                <div>
                  <span className="severity critical">
                    Critical
                  </span>

                  <strong>
                    Ransomware Activity
                  </strong>

                  <small>
                    2 incidents detected
                  </small>
                </div>

                <div>
                  <span className="severity high">
                    High
                  </span>

                  <strong>
                    Suspicious Login Attempts
                  </strong>

                  <small>
                    18 attempts detected
                  </small>
                </div>

                <div>
                  <span className="severity medium">
                    Medium
                  </span>

                  <strong>
                    Phishing Indicators
                  </strong>

                  <small>
                    31 indicators detected
                  </small>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h3>Security Score</h3>

                <span>Current</span>
              </div>

              <div className="score">
                <div className="score-circle">
                  <strong>
                    {dashboardData.securityScore}
                  </strong>

                  <span>/100</span>
                </div>

                <p>
                  Your hospital security posture is currently{" "}
                  <b>Good</b>.
                </p>
              </div>
            </div>
          </div>

          <div className="panel recent-panel">
            <div className="panel-header">
              <h3>Recent Security Events</h3>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Severity</th>
                  <th>Source</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    Failed authentication attempt
                  </td>

                  <td>
                    <span className="severity high">
                      High
                    </span>
                  </td>

                  <td>Login Service</td>

                  <td>10:35 PM</td>
                </tr>

                <tr>
                  <td>
                    Suspicious IP detected
                  </td>

                  <td>
                    <span className="severity medium">
                      Medium
                    </span>
                  </td>

                  <td>Threat Monitor</td>

                  <td>10:21 PM</td>
                </tr>

                <tr>
                  <td>
                    Security scan completed
                  </td>

                  <td>
                    <span className="severity low">
                      Low
                    </span>
                  </td>

                  <td>Scanner</td>

                  <td>09:58 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;