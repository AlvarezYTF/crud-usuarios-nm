<template>
  <div class="container py-5">
    <div class="bg-white p-4 shadow rounded-4">
      <h4 class="mb-4 fw-bold text-center text-primary">
        Dashboard de Administrador
      </h4>

      <button
        @click="cerrarSesion"
        class="btn btn-outline-danger btn-sm position-absolute start-40 top-10 translate-middle-y"
      >
        Cerrar sesión
      </button>

      <div class="mb-4 d-flex justify-content-center">
        <input
          v-model="busquedaDocumento"
          type="text"
          class="form-control w-50 me-2"
          placeholder="Buscar usuario por documento"
        />
      </div>

      <table
        class="table table-bordered table-hover text-center"
        v-if="usuarios.length"
      >
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(usuario, index) in usuarios" :key="usuario._id">
            <td>{{ index + 1 }}</td>
            <td>
              {{ usuario.primerNombre }} {{ usuario.segundoNombre }}
              {{ usuario.primerApellido }} {{ usuario.segundoApellido }}
            </td>
            <td>{{ usuario.numeroDocumento }}</td>
            <td>{{ usuario.correo }}</td>
            <td>{{ usuario.telefono }}</td>
            <td>{{ usuario.direccion }}</td>
            <td>
              <router-link
                v-if="usuario._id"
                :to="{ name: 'VerUsuario', params: { id: usuario._id } }"
                class="btn btn-sm btn-primary me-2"
                >Ver</router-link
              >
              <router-link
                v-if="usuario._id"
                :to="{ name: 'EditarUsuario', params: { id: usuario._id } }"
                class="btn btn-sm btn-secondary me-2"
                >Editar</router-link
              >
              <button
                v-if="usuario._id"
                class="btn btn-danger btn-sm"
                @click="eliminarUsuario(usuario._id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-center text-muted my-4">
        <i class="bi bi-info-circle"></i> No hay usuarios registrados.
      </div>
    </div>
  </div>
</template>

<script>
import userService from "../services/userService";
import Swal from 'sweetalert2';
export default {
  name: "AdminDashboard",
  data() {
    return {
      usuarios: [],
      busquedaDocumento: null,
      usuarioActualId: null,
    };
  },
  methods: {
    async cargarUsuarios() {
      try {
        // Obtener el ID del usuario actual del token
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          this.usuarioActualId = decodedToken.id;
        }

        const response = await userService.MostrarUsuarios();
        // Filtrar usuarios para excluir el usuario actual
        this.usuarios = response.data.filter(
          (usuario) => usuario._id !== this.usuarioActualId
        );
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    },
    async buscarPorDocumento() {
      if (!this.busquedaDocumento) return;

      try {
        const response = await userService.buscarDocumento(
          this.busquedaDocumento
        );
        if (response.data && response.data._id) {
          // En lugar de reemplazar usuarios, filtramos la lista original
          this.usuarios = this.usuarios.filter(
            (usuario) =>
              usuario.numeroDocumento === response.data.numeroDocumento
          );
        } else {
          this.usuarios = [];
        }
      } catch (error) {
        console.error("Error al buscar usuario:", error);
        this.usuarios = [];
      }
    },
    async eliminarUsuario(id) {
      try {
        // Mostrar confirmación con SweetAlert2
        const result = await Swal.fire({
          icon: 'warning',
          title: '¿Estás seguro?',
          text: 'Esta acción no se puede deshacer',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#6c757d'
        });
    
        if (!result.isConfirmed) return;
    
        // Proceder con la eliminación
        const response = await userService.eliminarUsuario(id);
    
        if (response.status === 200) {
          // Actualizar la lista de usuarios
          this.usuarios = this.usuarios.filter((usuario) => usuario._id !== id);
          
          // Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Usuario eliminado exitosamente',
            confirmButtonColor: '#2c3e50'
          });
        } else {
          throw new Error('Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el usuario',
          confirmButtonColor: '#d33'
        });
      }
    },
    cerrarSesion() {
      localStorage.removeItem("token"); // Elimina el token
      this.$router.push("/"); // Redirige al login o inicio
    },
  },
  mounted() {
    this.cargarUsuarios();
  },
  watch: {
    busquedaDocumento(newValue) {
      if (newValue) {
        this.buscarPorDocumento();
      } else {
        this.cargarUsuarios(); // recarga todos los usuarios si no hay búsqueda
      }
    },
  },
};
</script>
