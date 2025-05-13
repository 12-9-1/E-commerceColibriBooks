import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthModal from "../components/AuthModal";

const Register = ({ closeModal, onToggleForm }) => {

  const navigate = useNavigate();
  const { setUser } = useUser();
  const [authModalOpen, setAuthModalOpen] = useState(false);

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
      toast.warning("Las contraseñas no coinciden");
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
        toast.success("Registro exitoso");
        onToggleForm?.();  
      } else {
        toast.info("Ocurrió un error al registrarse");
      }
    } catch (error) {
      console.error("Error en el registro", error);
      toast.error(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>Registro</h3>
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
      <button type="submit" className="btn-confirm">Registrarse</button>
      <p className="auth-toggle">
        ¿Ya tienes cuenta? <span onClick={onToggleForm}>Iniciar sesión</span>
      </p>
    </form>
  );
};

export default Register;
