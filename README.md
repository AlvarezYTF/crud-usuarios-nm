# 🚀 Proyecto CRUD de Usuarios (Node.js + MongoDB + Vue.js)

## 🎯 Objetivo

Desarrollar una aplicación web tipo CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de usuarios, utilizando un stack tecnológico moderno con Node.js, MongoDB y Vue.js. El sistema también permite subir imágenes de usuario y validar formularios.

---

## 🧰 Tecnologías utilizadas

- **Backend**: Node.js, Express, MongoDB, Mongoose, Multer
- **Frontend**: Vue.js (CLI), Axios, Bootstrap o Tailwind, SweetAlert2
- **Control de versiones**: Git + GitHub
- **Planificación**: GitHub Projects (Kanban)

---

## 🧩 Casos de uso implementados

| Código | Nombre                   | Descripción                                                     |
|--------|--------------------------|-----------------------------------------------------------------|
| CU01   | Registrar usuario        | Formulario con datos e imagen                                   |
| CU02   | Listar usuarios          | Visualización de usuarios con imagen y edad calculada           |
| CU03   | Editar usuario           | Modificación de datos e imagen                                  |
| CU04   | Eliminar usuario         | Eliminación con confirmación                                    |
| CU05   | Visualizar imagen        | Mostrar imagen subida del usuario                               |
| CU06   | Validar formularios      | Validaciones en frontend y backend                              |
| CU07   | Mostrar feedback         | Mensajes visuales de éxito o error con SweetAlert2              |

---

## 📦 Estructura del Proyecto

### Backend

backend/
├── app.js
├── config/db.js
├── models/User.js
├── controllers/userController.js
├── routes/userRoutes.js
├── uploads/
└── .env


### Frontend

frontend/
├── src/
│ ├── components/
│ │ ├── UserList.vue
│ │ └── UserForm.vue
│ ├── App.vue
│ ├── main.js
│ └── services/axios.js
└── public/index.html
