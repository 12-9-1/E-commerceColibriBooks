import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // agregar al inicio
import AuthPage from "./pages/AuthPage";
import './App.css';
import { UserProvider } from "./context/UserContext";
import NavBar from "./components/NavBar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <UserProvider>
    <Router>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;

