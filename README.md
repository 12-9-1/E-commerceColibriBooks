# 📚 E-commerce Colibrí Books

**Colibrí Books** es una plataforma de comercio electrónico enfocada en la venta de libros. Permite a los usuarios explorar una amplia variedad de títulos, agregar libros al carrito, elegir formato (PDF o físico), realizar compras y gestionar su perfil. También incluye un panel para administración de libros, usuarios y mensajes.

🔗 [Ver demo en Vercel](https://e-commerce-colibri-books.vercel.app)

## 🚀 Tecnologías Utilizadas

### Frontend

* React.js
* React Router
* Context API
* Tailwind CSS / CSS personalizado
* React Toastify
* Cloudinary (para imágenes)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (autenticación)
* bcrypt
* dotenv
* Multer (para manejo de archivos)

### Deploy

* Vercel (frontend)
* Render / Railway / MongoDB Atlas (según configuración del backend)

---

## 🛠️ Instalación y Ejecución

### Requisitos Previos

* Node.js
* MongoDB (local o Atlas)
* Git

### Clonar Repositorio

```bash
git clone https://github.com/12-9-1/E-commerceColibriBooks.git
cd E-commerceColibriBooks
```

### Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend` y agrega:

```env
MONGODB_URI=tu_mongodb_uri
JWT_SECRET=una_clave_secreta
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Inicia el servidor:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## 🎯 Funcionalidades Principales

* 🛒 Agregar libros al carrito
* 📦 Compra con elección de formato (PDF o físico)
* 👤 Autenticación de usuarios (registro/login)
* 📂 Descarga automática de PDF tras compra
* ❤️ Lista de deseos con mensajes al admin
* ✉️ Bandeja de entrada del admin con respuestas
* 🛕️ Historial de compras por usuario
* 📚 Panel admin para gestionar libros, usuarios, mensajes
* 🎨 Personalización de perfil con borde y emoji
* 🔐 Recuperación de contraseña por email con token

---

## 👩‍💻 Autor

* **Nombre:** Lia Lisbet Costilla
* **GitHub:** [@12-9-1](https://github.com/12-9-1)

