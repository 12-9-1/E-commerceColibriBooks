import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/ForgotPassword.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("${API_URL}/api/user/forgot-password", { email });
      toast.success(res.data.message || "Correo enviado con instrucciones");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al enviar correo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>Recuperar Contraseña</h3>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="btn-confirm" disabled={loading}>
        {loading ? "Enviando..." : "Enviar instrucciones"}
      </button>
    </form>
  );
};

export default ForgotPassword;
