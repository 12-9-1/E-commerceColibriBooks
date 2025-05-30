import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/ForgotPassword.css"; 

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/user/reset-password/${token}`, { password });
      toast.success(res.data.message || "Contraseña actualizada");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al cambiar contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleReset}>
      <h3>Cambiar Contraseña</h3>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button type="submit" className="btn-confirm" disabled={loading}>
        {loading ? "Actualizando..." : "Actualizar contraseña"}
      </button>
    </form>
  );
};

export default ResetPassword;
