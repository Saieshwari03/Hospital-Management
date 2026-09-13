
import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import MediShieldLogo from "./MediShieldLogo";

function App() {
  // ==========================================
  // AUTHENTICATION
  // ==========================================

  const [authenticated, setAuthenticated] = useState(false);

  // ==========================================
  // DASHBOARD DATA
  // ==========================================

  const [dashboard, setDashboard] = useState({
    securityScore: 0,
    criticalThreats: 0,
    vulnerabilities: 0,
    securityEvents: 0,
  });

  const [loadingDashboard, setLoadingDashboard] = useState(true);

  // ==========================================
  // NAVIGATION
  // ==========================================

  const [activePage, setActivePage] = useState("Dashboard");

  // ==========================================
  // USER MANAGEMENT
  // ==========================================

  const [showAddUser, setShowAddUser] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@hospital.com",
      role: "SOC Analyst",
      department: "Security Operations",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Mehta",
      email: "priya@hospital.com",
      role: "Security Analyst",
      department: "Cybersecurity",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@hospital.com",
      role: "Hospital Staff",
      department: "Administration",
      status: "Disabled",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "SOC Analyst",
    department: "",
    status: "Active",
  });

  // ==========================================
  // FETCH DASHBOARD
  // ==========================================

  useEffect(() => {
    if (!authenticated) return;

    const fetchDashboard = async () => {
      try {
        setLoadingDashboard(true);

        const response = await fetch(
          "http://localhost:5252/api/dashboard"
        );

        if (!response.ok) {
          throw new Error("Dashboard API request failed");
        }

        const data = await response.json();

        setDashboard({
          securityScore: data.securityScore ?? 0,
          criticalThreats: data.criticalThreats ?? 0,
          vulnerabilities: data.vulnerabilities ?? 0,
          securityEvents: data.securityEvents ?? 0,
        });
      } catch (error) {
        console.error("Dashboard error:", error);

        // Demo fallback values
        setDashboard({
          securityScore: 86,
          criticalThreats: 3,
          vulnerabilities: 27,
          securityEvents: 142,
        });
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboard();
  }, [authenticated]);

  // ==========================================
  // ADD USER
  // ==========================================

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.department) {
      alert("Please fill all required fields.");
      return;
    }

    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: newUser.status,
    };

    setUsers((previousUsers) => [...previousUsers, user]);

    setNewUser({
      name: "",
      email: "",
      role: "SOC Analyst",
      department: "",
      status: "Active",
    });

    setShowAddUser(false);
  };

  // ==========================================
  // DELETE USER
  // ==========================================

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );

    if (!confirmed) return;

    setUsers((previousUsers) =>
      previousUsers.filter((user) => user.id !== id)
    );
  };

  // ==========================================
  // EDIT USER
  // ==========================================

  const handleEditUser = () => {
    alert(
      "User editing will be connected to the backend and PostgreSQL in the next step."
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    setAuthenticated(false);
    setActivePage("Dashboard");
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================

  if (!authenticated) {
    return (
      <Login
        onLogin={() => {
          setAuthenticated(true);
        }}
      />
    );
  }

  // ==========================================
  // SIDEBAR MENU
  // ==========================================

  const menuItems = [
    {
      name: "Dashboard",
      icon: "⌂",
    },
    {
      name: "Vulnerabilities",
      icon: "⚠",
    },
    {
      name: "Threat Intelligence",
      icon: "◈",
    },
    {
      name: "Security Events",
      icon: "◉",
    },
    {
      name: "Users",
      icon: "♙",
    },
    {
      name: "Audit Logs",
      icon: "▤",
    },
  ];

  // ==========================================
  // USER STATISTICS
  // ==========================================

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const disabledUsers = users.filter(
    (user) => user.status === "Disabled"
  ).length;

  const adminUsers = users.filter(
    (user) =>
      user.role === "Security Admin" ||
      user.role === "Administrator"
  ).length;

  // ==========================================
  // DASHBOARD PAGE
  // ==========================================

  const renderDashboard = () => {
    return (
      <>
        <div className="page-heading">
          <div>
            <div className="page-kicker">
              MEDISHIELD AI // SECURITY OPERATIONS
            </div>

            <h1>Security Command Center</h1>

            <p>
              Real-time healthcare cybersecurity monitoring and
              threat intelligence.
            </p>
          </div>

          <div className="system-live">
            <span></span>
            SYSTEM OPERATIONAL
          </div>
        </div>

        {/* Security Cards */}

        <div className="dashboard-cards">

          <div className="security-card score-card">
            <div className="card-top">
              <span>SECURITY SCORE</span>
              <span className="card-icon">◈</span>
            </div>

            <div className="score-value">
              {loadingDashboard
                ? "--"
                : `${dashboard.securityScore}%`}
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${dashboard.securityScore}%`,
                }}
              ></div>
            </div>

            <small>
              Overall healthcare infrastructure security
            </small>
          </div>

          <div className="security-card danger-card">
            <div className="card-top">
              <span>CRITICAL THREATS</span>
              <span className="card-icon">⚠</span>
            </div>

            <div className="metric-value">
              {loadingDashboard
                ? "--"
                : dashboard.criticalThreats}
            </div>

            <small>Requires immediate investigation</small>
          </div>

          <div className="security-card warning-card">
            <div className="card-top">
              <span>VULNERABILITIES</span>
              <span className="card-icon">△</span>
            </div>

            <div className="metric-value">
              {loadingDashboard
                ? "--"
                : dashboard.vulnerabilities}
            </div>

            <small>Detected across protected systems</small>
          </div>

          <div className="security-card event-card">
            <div className="card-top">
              <span>SECURITY EVENTS</span>
              <span className="card-icon">◉</span>
            </div>

            <div className="metric-value">
              {loadingDashboard
                ? "--"
                : dashboard.securityEvents}
            </div>

            <small>Events monitored today</small>
          </div>

        </div>

        {/* Main Monitoring Area */}

        <div className="dashboard-grid">

          <div className="dashboard-panel threat-panel">

            <div className="panel-header">
              <div>
                <span className="panel-label">
                  THREAT MONITOR
                </span>

                <h2>Healthcare Security Activity</h2>
              </div>

              <span className="live-indicator">
                LIVE
              </span>
            </div>

            <div className="threat-list">

              <div className="threat-row">
                <span className="threat-status critical">
                  CRITICAL
                </span>

                <div>
                  <strong>
                    Suspicious authentication activity
                  </strong>

                  <small>
                    Emergency Ward Network
                  </small>
                </div>

                <span>2m ago</span>
              </div>

              <div className="threat-row">
                <span className="threat-status warning">
                  HIGH
                </span>

                <div>
                  <strong>
                    Unusual database access pattern
                  </strong>

                  <small>
                    Patient Records Server
                  </small>
                </div>

                <span>8m ago</span>
              </div>

              <div className="threat-row">
                <span className="threat-status medium">
                  MEDIUM
                </span>

                <div>
                  <strong>
                    Endpoint security policy violation
                  </strong>

                  <small>
                    Administration Network
                  </small>
                </div>

                <span>17m ago</span>
              </div>

              <div className="threat-row">
                <span className="threat-status safe">
                  RESOLVED
                </span>

                <div>
                  <strong>
                    Malware detection blocked
                  </strong>

                  <small>
                    Clinical Workstation 04
                  </small>
                </div>

                <span>31m ago</span>
              </div>

            </div>
          </div>

          <div className="dashboard-panel status-panel">

            <div className="panel-header">
              <div>
                <span className="panel-label">
                  INFRASTRUCTURE
                </span>

                <h2>System Health</h2>
              </div>
            </div>

            <div className="system-health">

              <div className="health-item">
                <div>
                  <strong>Hospital Network</strong>
                  <small>Core infrastructure</small>
                </div>

                <span className="health-online">
                  ONLINE
                </span>
              </div>

              <div className="health-item">
                <div>
                  <strong>Patient Database</strong>
                  <small>Encrypted storage</small>
                </div>

                <span className="health-online">
                  SECURE
                </span>
              </div>

              <div className="health-item">
                <div>
                  <strong>Endpoint Protection</strong>
                  <small>Managed devices</small>
                </div>

                <span className="health-online">
                  ACTIVE
                </span>
              </div>

              <div className="health-item">
                <div>
                  <strong>Threat Intelligence</strong>
                  <small>External feeds</small>
                </div>

                <span className="health-online">
                  SYNCED
                </span>
              </div>

            </div>
          </div>

        </div>
      </>
    );
  };

  // ==========================================
  // USER MANAGEMENT PAGE
  // ==========================================

  const renderUsers = () => {
    return (
      <>
        <div className="page-heading">

          <div>
            <div className="page-kicker">
              MEDISHIELD AI // ACCESS CONTROL
            </div>

            <h1>User Management</h1>

            <p>
              Manage authorized personnel and security access.
            </p>
          </div>

          <button
            className="primary-action"
            onClick={() => setShowAddUser(true)}
          >
            + ADD USER
          </button>

        </div>

        {/* User Statistics */}

        <div className="user-stats">

          <div className="user-stat">
            <span>TOTAL USERS</span>
            <strong>{users.length}</strong>
          </div>

          <div className="user-stat">
            <span>ACTIVE</span>
            <strong>{activeUsers}</strong>
          </div>

          <div className="user-stat">
            <span>DISABLED</span>
            <strong>{disabledUsers}</strong>
          </div>

          <div className="user-stat">
            <span>ADMINISTRATORS</span>
            <strong>{adminUsers}</strong>
          </div>

        </div>

        {/* Users Table */}

        <div className="dashboard-panel users-panel">

          <div className="panel-header">

            <div>
              <span className="panel-label">
                AUTHORIZED PERSONNEL
              </span>

              <h2>Security Access Directory</h2>
            </div>

            <span className="user-count">
              {users.length} USERS
            </span>

          </div>

          <div className="users-table-wrapper">

            <table className="users-table">

              <thead>
                <tr>
                  <th>USER</th>
                  <th>ROLE</th>
                  <th>DEPARTMENT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (
                  <tr key={user.id}>

                    <td>
                      <div className="user-info">

                        <div className="user-avatar">
                          {user.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{user.name}</strong>

                          <small>{user.email}</small>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="role-badge">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      {user.department}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          user.status === "Active"
                            ? "active"
                            : "disabled"
                        }`}
                      >
                        <span></span>
                        {user.status}
                      </span>
                    </td>

                    <td>

                      <div className="table-actions">

                        <button
                          className="edit-button"
                          onClick={handleEditUser}
                        >
                          EDIT
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteUser(user.id)
                          }
                        >
                          DELETE
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      </>
    );
  };

  // ==========================================
  // OTHER MODULE PAGES
  // ==========================================

  const renderModule = (title, description, icon) => {
    return (
      <>
        <div className="page-heading">

          <div>
            <div className="page-kicker">
              MEDISHIELD AI // SECURITY MODULE
            </div>

            <h1>{title}</h1>

            <p>{description}</p>
          </div>

        </div>

        <div className="module-placeholder">

          <div className="module-icon">
            {icon}
          </div>

          <h2>{title}</h2>

          <p>
            This security module is being prepared for
            backend integration.
          </p>

          <span>
            MODULE STATUS: INITIALIZING
          </span>

        </div>
      </>
    );
  };

  // ==========================================
  // PAGE ROUTER
  // ==========================================

  const renderPage = () => {

    switch (activePage) {

      case "Dashboard":
        return renderDashboard();

      case "Users":
        return renderUsers();

      case "Vulnerabilities":
        return renderModule(
          "Vulnerability Management",
          "Identify, prioritize and monitor security weaknesses across healthcare infrastructure.",
          "⚠"
        );

      case "Threat Intelligence":
        return renderModule(
          "Threat Intelligence",
          "Monitor indicators of compromise, malicious activity and emerging healthcare cyber threats.",
          "◈"
        );

      case "Security Events":
        return renderModule(
          "Security Events",
          "Monitor and investigate security events generated across the healthcare environment.",
          "◉"
        );

      case "Audit Logs":
        return renderModule(
          "Audit Logs",
          "Track administrative actions and security activity for compliance and investigation.",
          "▤"
        );

      default:
        return renderDashboard();
    }
  };

  // ==========================================
  // MAIN APPLICATION
  // ==========================================

  return (
    <div className="app-shell">

      {/* ======================================
          SIDEBAR
      ======================================= */}

      <aside className="sidebar">

        <div className="sidebar-brand">
          <MediShieldLogo compact />
        </div>

        <div className="sidebar-system">
          <span className="system-dot"></span>
          SECURITY OPERATIONS
        </div>

        <nav className="sidebar-nav">

          <div className="nav-section-title">
            COMMAND CENTER
          </div>

          {menuItems.map((item) => (

            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>

              {activePage === item.name && (
                <span className="nav-active-line"></span>
              )}

            </button>

          ))}

        </nav>

        {/* Sidebar Bottom */}

        <div className="sidebar-bottom">

          <div className="security-status">

            <span className="status-pulse"></span>

            <div>
              <strong>SECURITY ACTIVE</strong>
              <small>All systems monitored</small>
            </div>

          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span>↪</span>
            LOGOUT
          </button>

        </div>

      </aside>

      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <main className="main-content">

        {/* Top Header */}

        <header className="topbar">

          <div className="topbar-left">

            <div className="breadcrumb">
              MEDISHIELD
              <span>/</span>
              {activePage.toUpperCase()}
            </div>

          </div>

          <div className="topbar-right">

            <div className="connection-status">
              <span></span>
              API CONNECTED
            </div>

            <div className="topbar-divider"></div>

            <div className="admin-profile">

              <div className="admin-avatar">
                SA
              </div>

              <div>
                <strong>Security Admin</strong>
                <small>Administrator</small>
              </div>

            </div>

          </div>

        </header>

        {/* Page Content */}

        <section className="content-area">
          {renderPage()}
        </section>

      </main>

      {/* ======================================
          ADD USER MODAL
      ======================================= */}

      {showAddUser && (

        <div
          className="modal-overlay"
          onClick={() => setShowAddUser(false)}
        >

          <div
            className="user-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>

                <span className="panel-label">
                  ACCESS CONTROL
                </span>

                <h2>Create Security User</h2>

                <p>
                  Add an authorized user to MediShield AI.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() => setShowAddUser(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddUser}>

              {/* Full Name */}

              <div className="modal-field">

                <label>FULL NAME</label>

                <input
                  type="text"
                  placeholder="Enter full name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      name: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* Email */}

              <div className="modal-field">

                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  placeholder="user@hospital.com"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* Role */}

              <div className="modal-field">

                <label>SECURITY ROLE</label>

                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value,
                    })
                  }
                >
                  <option>SOC Analyst</option>
                  <option>Security Analyst</option>
                  <option>Forensic Analyst</option>
                  <option>Hospital Staff</option>
                </select>

              </div>

              {/* Department */}

              <div className="modal-field">

                <label>DEPARTMENT</label>

                <input
                  type="text"
                  placeholder="e.g. Security Operations"
                  value={newUser.department}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      department: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* Status */}

              <div className="modal-field">

                <label>ACCOUNT STATUS</label>

                <select
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Active</option>
                  <option>Disabled</option>
                </select>

              </div>

              {/* Modal Actions */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowAddUser(false)}
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="primary-action"
                >
                  CREATE USER
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
