import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/purchases", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener compras");
        const data = await res.json();
        setPurchases(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPurchases();
  }, []);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    toast.info("Eliminando compra...");

    try {
      const res = await fetch(`http://localhost:3000/api/purchases/${selectedId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar la compra");

      setPurchases((prev) => prev.filter((p) => p._id !== selectedId));
      toast.success("Compra eliminada");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la compra");
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const exportToPDF = () => {
    if (purchases.length === 0) {
      toast.warning("No tenés compras registradas para descargar el PDF", {
        icon: "⚠️",
        autoClose: 3000,
        hideProgressBar: false,
        position: "top-right",
        pauseOnHover: true,
        theme: "colored",
      });
      return;
    }
  
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Historial de Compras", 14, 20);
  
    const tableData = [];
    purchases.forEach((purchase) => {
      purchase.books.forEach((item) => {
        tableData.push([
          new Date(purchase.purchaseDate).toLocaleString(),
          item.title,
          item.price,
          item.quantity,
          `$${item.price * item.quantity}`,
        ]);
      });
    });
  
    autoTable(doc, {
      startY: 30,
      head: [["Fecha", "Libro", "Precio", "Cantidad", "Subtotal"]],
      body: tableData,
    });
  
    const totalGastado = purchases.reduce((acc, p) => acc + p.total, 0);
    const finalY = doc.lastAutoTable?.finalY || 40;
    doc.text(`Total gastado: $${totalGastado}`, 14, finalY + 10);
  
    doc.save("compras.pdf");
  
    toast.success("📄 PDF descargado con éxito", {
      icon: "✅",
      autoClose: 3000,
      hideProgressBar: false,
      position: "top-right",
      pauseOnHover: true,
      theme: "colored",
    });
  };
  
  

  return (
    <div className="home">
      <div className="book-section">
        <h2>Mis compras</h2>

        {purchases.length === 0 ? (
          <p>No tenés compras registradas.</p>
        ) : (
          <>
            {purchases.map((purchase) => (
              <div key={purchase._id} className="book-grid">
                <p><strong>Fecha:</strong> {new Date(purchase.purchaseDate).toLocaleString()}</p>
                <ul>
                  {purchase.books.map((item, i) => (
                    <li key={i} className="purchase-item">
                      {item.bookId?.image && (
                        <img src={item.bookId.image} alt={item.title} />
                      )}
                      <span>{item.title} - ${item.price} x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> ${purchase.total}</p>
                <button onClick={() => confirmDelete(purchase._id)} className="btn-cancel">
                  Eliminar compra
                </button>
              </div>
            ))}
            <p><strong>Total gastado:</strong> ${purchases.reduce((acc, p) => acc + p.total, 0)}</p>
            <button onClick={exportToPDF} className="btn-confirm">Descargar PDF</button>
          </>
        )}
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Seguro que querés eliminar esta compra?</h3>
            <div className="modal-buttons">
              <button onClick={handleDelete} className="btn-confirm">Sí, eliminar</button>
              <button onClick={() => setShowConfirm(false)} className="btn-cancel">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default MyPurchases;
