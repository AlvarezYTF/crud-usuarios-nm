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

      <div class="d-flex justify-content-end">
        <img src="" alt="Imagen de perfil" class="rounded-circle shadow" />
      </div>

      <div class="mb-4 d-flex justify-content-center">
        <input
          v-model="busquedaDocumento"
          type="text"
          class="form-control w-50 me-2"
          placeholder="Buscar usuario por Numero de documento"
        />
        <button @click="buscarPorDocumento" class="btn btn-info">Buscar</button>
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
                :to="{ name: 'VerUsuario', params: { id: usuario._id } }"
                class="btn btn-sm btn-primary me-2"
                >Ver</router-link
              >
              <router-link
                :to="{ name: 'EditarUsuario', params: { id: usuario._id } }"
                class="btn btn-sm btn-secondary me-2"
                >Editar</router-link
              >
              <button
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
import userService from '../services/userService';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      usuarios: [],
      busquedaDocumento: null // Numero de documento del usuario a buscar
    };
  },
  methods: {
    async cargarUsuarios() {
      try {
        const response = await userService.MostrarUsuarios();
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    },

    async buscarPorDocumento() {
      if (!this.busquedaDocumento) return;

      try {
        const response = await userService.buscarDocumento(this.busquedaDocumento);
        this.usuarios = [response.data];
      } catch (error) {
        console.error('Usuario no encontrado o error:', error);
        this.usuarios = [];
      }
    },
    async eliminarUsuario(id) {
      const confirmacion = window.confirm('¿Estás seguro de eliminar este usuario?');

      if (!confirmacion) return;

      try {
        await userService.eliminarUsuario(id);
        this.usuarios = this.usuarios.filter(usuario => usuario._id !== id);
        alert('Usuario eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('No se pudo eliminar el usuario');
      }
    },
    cerrarSesion() {
    localStorage.removeItem('token'); // Elimina el token
    this.$router.push('/'); // Redirige al login o inicio
    }
  },
  mounted() {
    this.cargarUsuarios();
  },
  watch: {
    busquedaDocumento(newValue) {
      if (newValue) {
        this.buscarPorDocumento(); // Llama a la función de búsqueda si hay un valor
      } else {
        this.cargarUsuarios(); // Recarga todos los usuarios si no hay búsqueda
      }
    }
  }
}
</script>
