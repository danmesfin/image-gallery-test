import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    console.log("Token:", token);
    console.log("Is Authenticated:", isAuthenticated);

    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      navigate("/login");
      return;
    }
    console.log("Uploading image...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/image/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log("Upload response:", response);

      if (response.ok) {
        alert("Image uploaded successfully");
        setFile(null);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={!file}>
        Upload
      </button>
    </form>
  );
};
