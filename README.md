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
├── app.js                  # Archivo principal de la app Express
├── config/
│   └── db.js               # Configuración de conexión a MongoDB
├── models/
│   └── User.js             # Esquema Mongoose para usuarios
├── controllers/
│   └── userController.js   # Lógica de negocio: CRUD, validaciones
├── routes/
│   └── userRoutes.js       # Definición de rutas HTTP para usuarios
├── uploads/                # Carpeta donde se guardan imágenes de perfil
└── .env                    # Variables de entorno (puerto, URI Mongo, etc.)


### Frontend

frontend/
├── public/
│   └── index.html          # Plantilla HTML principal
├── src/
│   ├── main.js             # Punto de entrada de la app Vue
│   ├── App.vue             # Componente raíz
│   ├── services/
│   │   └── axios.js        # Configuración global de Axios
│   └── components/
│       ├── UserList.vue    # Muestra lista de usuarios y botones
│       └── UserForm.vue    # Formulario para crear/editar usuarios
