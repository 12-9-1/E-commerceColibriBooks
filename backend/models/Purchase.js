// src/models/Purchase.js
const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    books: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",  
          required: true,
        },
        title: String,
        price: Number,
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
    
    shipping: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    payment: {
      cardNumber: { type: String, required: true },
      cardName: { type: String, required: true },
      expiry: { type: String, required: true },
      cvv: { type: String, required: true }
    },

  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
