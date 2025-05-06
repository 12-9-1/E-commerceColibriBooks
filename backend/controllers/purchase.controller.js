// controllers/purchase.controller.js
const Purchase = require("../models/Purchase");

const createPurchase = async (req, res) => {
  try {
    const { books, total } = req.body;
    const userId = req.user.userId;  

    const purchase = new Purchase({
      user: userId,
      books,
      total,
    });

    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    console.error("Error al registrar la compra:", error); 
    res.status(500).json({ message: "Error al registrar la compra", error });
  }
};

const getUserPurchases = async (req, res) => {
  try {
    const userId = req.user.userId;  
    const purchases = await Purchase.find({ user: userId }).populate("books.bookId");
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res.status(500).json({ message: "Error al obtener las compras", error });
  }
};

const deletePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const userId = req.user.userId;

    const purchase = await Purchase.findOneAndDelete({ _id: purchaseId, user: userId });

    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada o no autorizada" });
    }

    res.status(200).json({ message: "Compra eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar compra:", error);
    res.status(500).json({ message: "Error al eliminar compra", error });
  }
};


module.exports = { createPurchase, getUserPurchases, deletePurchase };
