// src/pages/MyPurchases.jsx
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";


const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
    
        const res = await fetch("http://localhost:3000/api/purchases", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
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

  const exportToPDF = () => {
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

    doc.autoTable({
      startY: 30,
      head: [["Fecha", "Libro", "Precio", "Cantidad", "Subtotal"]],
      body: tableData,
    });

    const totalGastado = purchases.reduce((acc, p) => acc + p.total, 0);
    doc.text(`Total gastado: $${totalGastado}`, 14, doc.lastAutoTable.finalY + 10);

    doc.save("compras.pdf");
  };

  return (
    <div className="home-container">
      <h2>Mis compras</h2>
      {purchases.length === 0 ? (
        <p>No tenés compras registradas.</p>
      ) : (
        <>
          {purchases.map((purchase) => (
            <div key={purchase._id} className="purchase-card">
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(purchase.purchaseDate).toLocaleString()}
              </p>
              <ul>
                {purchase.books.map((item, i) => (
                  <li key={i}>
                    {item.title} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total:</strong> ${purchase.total}
              </p>
            </div>
          ))}

          <p>
            <strong>Total gastado:</strong>{" "}
            ${purchases.reduce((acc, p) => acc + p.total, 0)}
          </p>

          <button onClick={exportToPDF}>Descargar PDF</button>
        </>
      )}
    </div>
  );
};

export default MyPurchases;
