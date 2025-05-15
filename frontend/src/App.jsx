import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import './App.css';
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import AdminProfileCard from './pages/AdminProfileCard';
import BookPreviewCard from './components/BookPreviewCard';
import AdminBookList from './pages/AdminBookList';
import Library from './pages/Library';
import MyPurchases from "./pages/MyPurchases";
import CartModal from "./components/CartModal"; 
import Favorites from "./pages/Favorites";
import Wishlist from "./pages/Wishlist";
import Footer from './components/Footer';
import AuthModal from "./components/AuthModal";
import { MessageProvider } from "./context/MessageContext";
import AdminInbox from "./pages/AdminInbox";
import UserMessages from "./pages/UserMessages";


function App() {
  const [showCart, setShowCart] = useState(false); 

  return (
    <UserProvider>
      <CartProvider> 
      <MessageProvider>
      <Router>
  <NavBar onCartClick={() => setShowCart(true)} />
  {showCart && <CartModal onClose={() => setShowCart(false)} />} 
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/adminusers" element={<AdminDashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/admin" element={<AdminProfileCard />} />
    <Route path="/book/:id" element={<BookPreviewCard />} />
    <Route path="/adminbooks" element={<AdminBookList />} />
    <Route path="/library" element={<Library />} />
    <Route path="/purchases" element={<MyPurchases />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/admininbox" element={<AdminInbox />} />
    <Route path="/usermessages" element={<UserMessages />} />
  </Routes>
    <Footer />
  <ToastContainer position="top-right" autoClose={3000} />
  </Router>
  </MessageProvider>
    </CartProvider> 
    </UserProvider>
  );
}

export default App;
