import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard";
import UploadImage from "./Pages/UploadImage";
import MyImages from "./Pages/MyImages";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/myimages" element={<MyImages />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
