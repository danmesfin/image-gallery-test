import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiHome, FiUpload, FiImage } from "react-icons/fi";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/upload", label: "Upload Image", icon: FiUpload },
    { path: "/analyze", label: "AI Analze", icon: FiImage },
    // { path: "/", label: "Settings", icon: FiSettings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const logoSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `;

  return (
    <aside
      className={`bg-indigo-700 text-white h-screen ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-20 border-b border-indigo-600">
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />
          {isOpen && (
            <span className="ml-2 text-xl font-bold">Image Gallery</span>
          )}
        </div>
        <nav className="flex-grow">
          <ul className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <li key={item.path} className="w-full">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 ${
                    location.pathname === item.path
                      ? "bg-indigo-800 text-white"
                      : "text-indigo-200 hover:bg-indigo-600"
                  } transition-colors duration-200`}
                >
                  {item.icon && <item.icon />}
                  {isOpen && <span className=" px-2 flex">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="text-gray-100 hover:text-gray-500 w-full text-left my-2 px-4"
        >
          Logout
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 text-indigo-200 hover:bg-indigo-600 transition-colors duration-200"
        >
          {isOpen ? "<<" : ">>"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
