const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recibido:", token); // 👈 VERIFICA ESTO EN CONSOLA

  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Aquí se necesita el secret
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error); // 👈 LOG SI ES INVÁLIDO
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
