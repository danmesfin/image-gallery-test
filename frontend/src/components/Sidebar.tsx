const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <nav>
        <ul>
          <li className="my-2">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
          </li>
          <li className="my-2">
            <a href="/upload" className="text-gray-600 hover:text-gray-900">
              Upload Image
            </a>
          </li>
          <li className="my-2">
            <a href="/myimages" className="text-gray-600 hover:text-gray-900">
              My Images
            </a>
          </li>
          <li className="my-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Settings
            </a>
          </li>
          <li className="my-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
