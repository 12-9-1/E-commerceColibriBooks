import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthPage.css";
import { useUser } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
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
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: form.email,
        password: form.password
      });
  
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token); 
  
        setUser(res.data.user);
  
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
  
        toast.success("Login exitoso");
      } else {
        toast.warning("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el login", error);
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };
  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
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
        <button type="submit">Ingresar</button>
        <p>¿No tenés cuenta? <span onClick={() => navigate("/register")}>Registrate</span></p>
      </form>
    </div>
  );
};

export default Login;
