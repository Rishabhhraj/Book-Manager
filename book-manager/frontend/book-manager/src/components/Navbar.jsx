import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#0a0a0a] text-white rounded-2xl px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 mb-1">
          Personal Book Manager
        </p>
        <h1 className="text-lg sm:text-xl font-bold">
          Your reading collection
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {user?.name && (
          <span className="text-sm text-neutral-300 hidden sm:inline">
            {user.name}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-white text-[#0a0a0a] text-sm font-semibold hover:bg-neutral-100 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
