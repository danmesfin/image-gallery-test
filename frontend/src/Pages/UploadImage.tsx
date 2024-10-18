import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UploadImage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Upload New Image</h1>
          <form className="bg-white p-4 rounded-lg shadow-md">
            <input type="file" className="mb-4" />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Upload
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UploadImage;
