// controllers/purchase.controller.js
const Purchase = require("../models/Purchase");

const createPurchase = async (req, res) => {
  try {
    const { books, total } = req.body;
    const userId = req.user.userId;  // ← CORREGIDO

    const purchase = new Purchase({
      user: userId,
      books,
      total,
    });

    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    console.error("Error al registrar la compra:", error); // log más claro
    res.status(500).json({ message: "Error al registrar la compra", error });
  }
};

const getUserPurchases = async (req, res) => {
  try {
    const userId = req.user.userId;  // ← cambiar aquí también si usas req.user.id
    const purchases = await Purchase.find({ user: userId }).populate("books.bookId");
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error al obtener las compras:", error);
    res.status(500).json({ message: "Error al obtener las compras", error });
  }
};

module.exports = { createPurchase, getUserPurchases };
