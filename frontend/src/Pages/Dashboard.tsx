import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ImageCard from "../components/shared/ImageCard";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <ImageCard
                key={index}
                imageSrc={`https://via.placeholder.com/150?text=Image+${
                  index + 1
                }`}
                title={`Image ${index + 1}`}
                uploadDate={new Date().toLocaleDateString()}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
