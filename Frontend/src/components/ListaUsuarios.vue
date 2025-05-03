<template>
  <div class="usuarios-lista">
    <h2>Lista de Usuarios</h2>
    <div class="nuevo-usuario">
      <button @click="$router.push('/usuario/nuevo')">Nuevo Usuario</button>
    </div>
    <table v-if="usuarios.length">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario._id">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.telefono }}</td>
          <td>
            <button @click="editarUsuario(usuario._id)">Editar</button>
            <button @click="eliminarUsuario(usuario._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay usuarios registrados</p>
  </div>
</template>

<script>
import UsuarioService from '@/services/UsuarioService';

export default {
  name: 'ListaUsuarios',
  data() {
    return {
      usuarios: []
    };
  },
  created() {
    this.cargarUsuarios();
  },
  methods: {
    async cargarUsuarios() {
      try {
        const response = await UsuarioService.obtenerUsuarios();
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    },
    editarUsuario(id) {
      this.$router.push(`/usuario/editar/${id}`);
    },
    async eliminarUsuario(id) {
      if (confirm('¿Está seguro de eliminar este usuario?')) {
        try {
          await UsuarioService.eliminarUsuario(id);
          this.cargarUsuarios();
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.usuarios-lista {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.nuevo-usuario {
  margin-bottom: 20px;
}
</style>