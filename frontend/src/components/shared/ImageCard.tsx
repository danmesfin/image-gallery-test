import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FiSearch } from "react-icons/fi";

const ImageCard = ({
  id,
  imageSrc,
  title,
  uploadDate,
}: {
  id: number;
  imageSrc: string;
  title: string;
  uploadDate: string;
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/image/analyze/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setAnalysis(data.analysis);
      setShowModal(true);
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="relative bg-white rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
        <button
          onClick={handleAnalyze}
          className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          disabled={isAnalyzing}
        >
          <FiSearch className={isAnalyzing ? "animate-spin" : ""} />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <p className="text-sm text-gray-500">Uploaded on {uploadDate}</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Image Analysis</h2>
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-64 object-contain mb-4"
            />
            <p className="text-gray-700">{analysis}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
