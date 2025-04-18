import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthPage.css";
import { useUser } from "../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

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

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const dataToSend = {
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword
    };

    try {
      const res = await axios.post(`http://localhost:3000/api/auth/register`, dataToSend);


      if (res.status === 201) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        console.log("Usuario registrado y guardado en localStorage:", res.data.user);  // Agregar este log
        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert("Ocurrió un error al registrarse");
      }
    } catch (error) {
      console.error("Error en el registro", error);
      alert(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <span onClick={() => navigate("/login")}>Iniciar sesión</span></p>
      </form>
    </div>
  );
};

export default Register;
