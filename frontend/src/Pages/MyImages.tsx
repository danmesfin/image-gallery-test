import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ImageCard from "../components/shared/ImageCard";

const MyImages = () => {
  // Replace this with actual data retrieval from your backend
  const images = [
    {
      id: 1,
      src: "https://via.placeholder.com/150?text=Image+1",
      title: "Image 1",
      uploadDate: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      src: "https://via.placeholder.com/150?text=Image+2",
      title: "Image 2",
      uploadDate: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      src: "https://via.placeholder.com/150?text=Image+3",
      title: "Image 3",
      uploadDate: new Date().toLocaleDateString(),
    },
    // Add more images as needed
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">My Images</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                id={image.id}
                imageSrc={image.src}
                title={image.title}
                uploadDate={image.uploadDate}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyImages;
