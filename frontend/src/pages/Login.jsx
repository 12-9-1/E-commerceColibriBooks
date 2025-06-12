import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const API_URL = import.meta.env.VITE_API_URL;

const Login = ({ closeModal, onToggleForm }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email: form.email,
        password: form.password
      });
  
    if (res.data?.user) {
      const userData = res.data.user;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", res.data.token);

      setUser(userData);

      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login exitoso");
      closeModal?.();
    } else {
      toast.warning("Credenciales incorrectas");
    }

    } catch (error) {
      console.error("Error en el login", error);
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>Iniciar Sesión</h3>
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn-confirm">Ingresar</button>
      <p className="auth-toggle">
        ¿No tenés cuenta? <span onClick={onToggleForm}>Registrate</span>
      </p>
      <p className="auth-toggle">
      <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </p>

    </form>
    
  );
};

export default Login;
