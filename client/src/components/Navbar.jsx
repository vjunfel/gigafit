import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-black p-3 w-100 border-bottom border-dark">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">GigaFit</Link>

        <div className="navbar-nav gap-3 align-items-center">
          {user ? (
            <>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/dashboard">Dashboard</Link>

              <button onClick={handleLogout} className="btn btn-sm btn-outline-light ms-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/about">About</Link>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
