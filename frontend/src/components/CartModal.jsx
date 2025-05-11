import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext"; 
import { toast } from "react-toastify";

const CartModal = ({ onClose }) => {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      toast.error("Necesitás iniciar sesión para comprar");
      onClose();
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000); // Espera 2 segundos antes de redirigir
    }
  }, [user, onClose]);

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = Date.now() >= payload.exp * 1000;

        if (isExpired) {
          localStorage.removeItem("token");
          window.location.href = "/login"; 
        }
      }

      const calculatedTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const response = await fetch("http://localhost:3000/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          books: cartItems.map(item => ({
            bookId: item._id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          })),
          total: calculatedTotal,
        })
      });

      if (!response.ok) throw new Error("Error al procesar la compra");
      const data = await response.json();
      console.log("Compra registrada:", data);

      toast.success("¡Compra realizada con éxito! 🎉");

      clearCart();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al procesar la compra.");
    }
  };

  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Tu carrito</h3>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, i) => (
                <li key={i}>
                  {item.title} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ${total}</p>
            <button className="btn-confirm" onClick={handleConfirm}>
              Confirmar compra
            </button>
          </>
        )}
        <button className="btn-cancel" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CartModal;
