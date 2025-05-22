// backend/routes/purchase.routes.js
const express = require("express");
const router = express.Router();

const { createPurchase, getUserPurchases, deletePurchase } = require("../controllers/purchase.controller");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, createPurchase);
router.get("/", authMiddleware, getUserPurchases);
router.delete("/:id", authMiddleware, deletePurchase);


module.exports = router;
