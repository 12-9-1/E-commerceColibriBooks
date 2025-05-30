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
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound"; 
import AboutMe from "./pages/AboutMe";
import FloatingHelpButton from "./components/FloatingHelpButton";
import ResetPassword from "./pages/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";


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

  {/* Rutas públicas */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/auth" element={<AuthPage />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
  <Route path="/notfound" element={<NotFound />} />
  <Route path="/aboutme" element={<AboutMe />} />
  <Route path="/library" element={<Library />} />

  {/* Rutas privadas - cualquier usuario logueado */}
  <Route path="/profile" element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  } />
  <Route path="/purchases" element={
    <PrivateRoute>
      <MyPurchases />
    </PrivateRoute>
  } />
  <Route path="/favorites" element={
    <PrivateRoute>
      <Favorites />
    </PrivateRoute>
  } />
  <Route path="/wishlist" element={
    <PrivateRoute>
      <Wishlist />
    </PrivateRoute>
  } />
  <Route path="/usermessages" element={
    <PrivateRoute>
      <UserMessages />
    </PrivateRoute>
  } />

  {/* Rutas solo para admins */}
  <Route path="/adminusers" element={
    <PrivateRoute adminOnly={true}>
      <AdminDashboard />
    </PrivateRoute>
  } />
  <Route path="/admin" element={
    <PrivateRoute adminOnly={true}>
      <AdminProfileCard />
    </PrivateRoute>
  } />
  <Route path="/adminbooks" element={
    <PrivateRoute adminOnly={true}>
      <AdminBookList />
    </PrivateRoute>
  } />
  <Route path="/admininbox" element={
    <PrivateRoute adminOnly={true}>
      <AdminInbox />
    </PrivateRoute>
  } />

  <Route path="/book/:id" element={<BookPreviewCard />} />
</Routes>
    <FloatingHelpButton />
    <Footer />
  <ToastContainer position="top-right" autoClose={3000} />
  </Router>
  </MessageProvider>
    </CartProvider> 
    </UserProvider>
  );
}

export default App;
