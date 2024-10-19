import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FiUpload, FiLink } from "react-icons/fi";
import { FaWandMagicSparkles } from "react-icons/fa6";
const ImageAnalyzePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageUrl("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setFile(null);
    setPreview(e.target.value);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis(null);
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    } else {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/image/analyze`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data.analysis);
      } else {
        const data = await response.json();
        console.error("Analysis failed:", data.message);
      }
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">AI Image Analysis</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <p className="text-gray-600 mb-4">
              Experience the power of AI-driven image analysis. Our cutting-edge
              technology can identify objects, detect themes, and provide
              detailed descriptions of your images. Simply upload an image or
              paste a URL to get started!
            </p>
            <div className="mb-6">
              <label
                htmlFor="image-url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL
              </label>
              <div className="flex items-center">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLink className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="image-url"
                    className="block w-full pl-10 pr-12 py-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    placeholder="Enter image URL"
                  />
                </div>
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <FiUpload className="mr-2" />
                  Upload
                </label>
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            {preview && (
              <div className="mb-6">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-64 object-contain mx-auto"
                />
              </div>
            )}
            <button
              onClick={handleAnalyze}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              disabled={isLoading || (!file && !imageUrl)}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <>
                  <FaWandMagicSparkles className="mr-2" />
                  Analyze Image
                </>
              )}
            </button>
          </div>
          {(isLoading || analysis) && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Analysis Result:</h2>
              {isLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ImageAnalyzePage;
