const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold border-b">Image Gallery</div>
        <nav className="p-4">
          <ul>
            <li className="my-2">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Upload Image
              </a>
            </li>
            <li className="my-2">
              <a href="#" className="text-gray-600 hover:text-gray-900">
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

      {/* Main content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Upload New Image
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Sample image cards */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`https://via.placeholder.com/150?text=Image+${index + 1}`}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">Image {index + 1}</h2>
                <p className="text-gray-500">
                  Uploaded on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
