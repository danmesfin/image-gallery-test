import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import backgroundImage from "../assets/background.jpeg";

export const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={backgroundImage}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full px-6">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <a
            href="/reset-password"
            className="block text-center mt-4 text-indigo-600 hover:underline"
          >
            Forgot Password?
          </a>
          <a
            href="/register"
            className="block text-center mt-4 text-indigo-600 hover:underline"
          >
            Don't have an account? Register here.
          </a>
        </div>
      </div>
    </div>
  );
};
