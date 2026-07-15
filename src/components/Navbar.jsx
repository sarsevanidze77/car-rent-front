import { Link } from "react-router-dom";

function Navbar() {
  const user = localStorage.getItem("user");
  const avatar = localStorage.getItem("avatar");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");

    window.location.href = "/";
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>🚗 Car Rent</div>

      <nav style={styles.nav}>
        <Link style={styles.link} to="/">
          Home
        </Link>

        {user ? (
          <div style={styles.right}>
            <Link style={styles.addCar} to="/add-car">
              ➕ Add Car
            </Link>

            <Link to="/profile">
              {avatar ? (
                <img
                  src={avatar}
                  alt="profile"
                  style={styles.avatar}
                />
              ) : (
                <div style={styles.defaultAvatar}>👤</div>
              )}
            </Link>

            <Link style={styles.profile} to="/profile">
              Profile
            </Link>

            <button style={styles.logout} onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div style={styles.right}>
            <Link style={styles.login} to="/login">
              Login
            </Link>

            <Link style={styles.register} to="/register">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#0f172a",
    color: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    zIndex: 1000,
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "14px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "20px",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
  },

  defaultAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  addCar: {
    padding: "8px 14px",
    borderRadius: "8px",
    background: "#22c55e",
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  },

  profile: {
    padding: "8px 14px",
    borderRadius: "8px",
    background: "#6366f1",
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  },

  login: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #3b82f6",
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "14px",
  },

  register: {
    padding: "8px 14px",
    borderRadius: "8px",
    background: "#3b82f6",
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  },

  logout: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;