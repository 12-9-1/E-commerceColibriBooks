import { useState } from "react";
import axios from "axios";
import "../styles/AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await axios.post(`http://localhost:3000${endpoint}`, form);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Ocurrió un error");
    }
  };

  return (
    <div className="auth-container">
      <div className={`form-container ${isLogin ? "show-login" : "show-register"}`}>
        <form className="auth-form register-form" onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleChange} required />
          <button type="submit">Registrar</button>
        </form>

        <form className="auth-form login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <button type="submit">Ingresar</button>
        </form>
      </div>

      <div className="auth-toggle">
        <button onClick={() => setIsLogin(true)}>Iniciar sesión</button>
        <button onClick={() => setIsLogin(false)}>Registrarse</button>
      </div>
    </div>
  );
};

export default AuthPage;
