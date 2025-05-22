const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recibido:", token); 

  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error); 
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
