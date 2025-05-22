// testEmail.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  to: "tu_otro_correo@gmail.com",
  from: process.env.EMAIL_USER,
  subject: "Prueba de envío",
  text: "Funciona correctamente",
}, (err, info) => {
  if (err) {
    console.error("Error al enviar:", err);
  } else {
    console.log("Correo enviado:", info.response);
  }
});
