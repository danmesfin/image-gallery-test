const Navbar = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Image Gallery</h1>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Upload New Image
      </button>
    </header>
  );
};

export default Navbar;
