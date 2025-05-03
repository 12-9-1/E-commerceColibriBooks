// backend/routes/purchase.routes.js
const express = require("express");
const router = express.Router();

const { createPurchase, getUserPurchases } = require("../controllers/purchase.controller");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Protegidas con authMiddleware
router.post("/", authMiddleware, createPurchase);
router.get("/", authMiddleware, getUserPurchases);

module.exports = router;
