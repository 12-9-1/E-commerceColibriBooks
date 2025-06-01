import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CartModal = ({ onClose }) => {
  const [total, setTotal] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { cartItems, clearCart, removeFromCart, updateCartItemFormat } = useCart(); // <--- Agregado
  const { user } = useUser();
  const [downloadableBooks, setDownloadableBooks] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);


  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cartItems]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem("token");

    const purchaseData = {
      books: cartItems.map(item => ({
        bookId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        format: item.format || "pdf" 
      })),
      total,
      shipping: {
        address: formData.get("address"),
        city: formData.get("city"),
        postalCode: formData.get("postalCode")
      },
      payment: {
        cardNumber: formData.get("cardNumber"),
        cardName: formData.get("cardName"),
        expiry: formData.get("expiry"),
        cvv: formData.get("cvv")
      }
    };

    try {
      const res = await fetch(`${API_URL}/api/purchases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(purchaseData)
      });

      if (res.ok) {
  const purchase = await res.json();

  const pdfBooks = purchase.books.filter(book => book.format === "pdf" && book.downloadUrl);
  setDownloadableBooks(pdfBooks);
  setShowDownloadModal(true);

  toast.success("¡Compra realizada con éxito!");
  clearCart();
  onClose();
}
      else {
        toast.error("Error al procesar la compra");
      }
    } catch (error) {
      console.error("Error en la compra:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <div className="modal-upload">
      <div className="modal-content">
        <h3>Tu carrito</h3>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, i) => (
                <li key={i} className="cart-item">
                  <span>{item.title} - ${item.price} x {item.quantity}</span>

                  {/* Selección de formato */}
                  <div className="upload-form">
                    <label>
                      <input
                        type="radio"
                        name={`format-${item._id}-${i}`}
                        value="pdf"
                        checked={item.format === "pdf"}
                        onChange={() => updateCartItemFormat(item._id, "pdf")}
                      />
                      PDF
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`format-${item._id}-${i}`}
                        value="fisico"
                        checked={item.format === "fisico"}
                        onChange={() => updateCartItemFormat(item._id, "fisico")}
                      />
                      Físico
                    </label>
                  </div>

                  <button
                    className="btn-delete-item"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <p><strong>Total:</strong> ${total}</p>

            {!showPaymentForm ? (
              <button onClick={() => setShowPaymentForm(true)} className="btn-confirm">
                Comprar
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="upload-form">
                <h4>Datos de envío</h4>
                <input type="text" name="address" placeholder="Dirección completa" required />
                <input type="text" name="city" placeholder="Ciudad" required />
                <input type="text" name="postalCode" placeholder="Código postal" required />

                <h4>Datos de la tarjeta</h4>
                <input type="text" name="cardNumber" placeholder="Número de tarjeta" required maxLength={16} />
                <input type="text" name="cardName" placeholder="Nombre en la tarjeta" required />
                <input type="text" name="expiry" placeholder="MM/AA" required />
                <input type="text" name="cvv" placeholder="CVV" required maxLength={4} />

                <button type="submit" className="btn-confirm">Confirmar compra</button>
              </form>
            )}
          </>
        )}
        <button className="btn-cancel" onClick={onClose}>Cerrar</button>

      {showDownloadModal && (
  <div className="modal-upload">
    <div className="modal-content">
      <h3>Descargas disponibles</h3>
      {downloadableBooks.length > 0 ? (
        <ul>
          {downloadableBooks.map((book, i) => (
            <li key={i}>
              <a
                href={book.downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                📥 Descargar {book.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay libros descargables.</p>
      )}
      <button className="btn-confirm" onClick={() => setShowDownloadModal(false)}>
        Cerrar
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default CartModal;
