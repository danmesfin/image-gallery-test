import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { token } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/image/upload-supabase`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setMessage({ type: "success", text: "Image uploaded successfully!" });
        setFile(null);
        setPreview(null);
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
      } else {
        const data = await response.json();
        setMessage({ type: "error", text: data.message || "Upload failed" });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ type: "error", text: "An error occurred during upload" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Upload New Image</h1>
          {message && (
            <div
              className={`p-4 mb-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4"
              accept="image/*"
            />
            {preview && (
              <div className="mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-xs max-h-64 object-contain"
                />
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              disabled={!file || isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default UploadImage;
