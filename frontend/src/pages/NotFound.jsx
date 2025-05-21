// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-orange-600">404</h1>
      <p className="text-2xl mt-4 text-gray-700">Página no encontrada</p>
      <p className="text-md text-gray-500 mt-2">La ruta que buscás no existe.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
