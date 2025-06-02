# 🛠️ Backend de E-commerce Colibrí Books

Este es el backend del proyecto **Colibrí Books**, una plataforma de comercio electrónico especializada en la venta de libros. Desarrollado con Node.js, Express y MongoDB, proporciona una API robusta para gestionar usuarios, productos, pedidos y más.

## 🚀 Tecnologías Utilizadas

* **Servidor:** Node.js
* **Framework:** Express.js
* **Base de Datos:** MongoDB con Mongoose
* **Autenticación:** JSON Web Tokens (JWT)
* **Encriptación de Contraseñas:** bcrypt
* **Variables de Entorno:** dotenv
* **Manejo de Archivos:** Multer
* **Almacenamiento de Imágenes:** Cloudinary

## 🛠️ Instalación y Ejecución

### Requisitos Previos

* Node.js (versión 14 o superior)
* MongoDB (local o Atlas)
* npm o yarn

### Pasos para Clonar y Ejecutar el Proyecto

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/12-9-1/E-commerceColibriBooks.git
   cd E-commerceColibriBooks/backend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**

   Crea un archivo `.env` en la carpeta `backend` y agrega las siguientes variables:

   ```env
   MONGODB_URI=tu_mongodb_uri
   JWT_SECRET=una_clave_secreta
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   ```

4. **Iniciar el servidor:**

   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:3000`.

## 📂 Estructura del Proyecto

```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── uploads/
├── .env
├── app.js
├── package.json
└── README.md
```

## 🔐 Funcionalidades Principales

* Registro e inicio de sesión de usuarios con autenticación JWT.
* Gestión de productos: creación, edición, eliminación y listado.
* Gestión de pedidos y compras.
* Subida y gestión de imágenes de productos con Cloudinary.
* Protección de rutas mediante middleware de autenticación.
* Manejo de errores y validaciones.

## 👩‍💻 Autor

* **Nombre:** Lia Lisbet Costilla
* **GitHub:** [@12-9-1](https://github.com/12-9-1)

