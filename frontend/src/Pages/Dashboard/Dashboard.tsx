import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ImageCard from "../../components/shared/ImageCard";

interface Image {
  id: number;
  url: string;
  filename: string;
  upload_date: string;
}

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/image/images`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setImages(data.images);
          console.log(data);
          setImageCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [token]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="mb-4">Total Images: {imageCount}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image: Image) => (
              <ImageCard
                key={image.id}
                id={image.id}
                imageSrc={image.url}
                title={
                  image.filename.length > 10
                    ? image.filename.substring(0, 10) + "..."
                    : image.filename
                }
                uploadDate={new Date(image.upload_date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
