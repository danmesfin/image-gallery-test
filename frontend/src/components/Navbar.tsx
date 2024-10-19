import { Link } from "react-router-dom";
import { FiUpload, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">Image Gallery</h1>
          <div className="flex items-center space-x-4">
            <Link
              to="/upload"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <FiUpload className="mr-2" />
              Upload
            </Link>
            <button className="text-gray-500 hover:text-gray-700">
              <FiBell className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FiUser className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
