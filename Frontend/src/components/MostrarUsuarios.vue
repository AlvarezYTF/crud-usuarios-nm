<template>
    <div class="container py-5">
      <div class="bg-white p-4 shadow rounded-4">
        <h4 class="mb-4 fw-bold text-center">Dashboard de Administrador</h4>
  
        <table class="table table-bordered table-hover text-center" v-if="usuarios.length">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in usuarios" :key="usuario._id">
              <td>{{ index + 1 }}</td>
              <td>{{ usuario.primerNombre }} {{ usuario.primerApellido }}</td>
              <td>{{ usuario.correo }}</td>
              <td>{{ usuario.telefono }}</td>
              <td>{{ usuario.direccion }}</td>
              <td>
                <button class="btn btn-sm btn-primary me-2">Ver</button>
                <button class="btn btn-sm btn-warning me-2">Actualizar</button>
                <button class="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div v-else class="text-center text-muted my-4">
          No hay usuarios registrados.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard',
    data() {
      return {
        usuarios: [],
      };
    },
    methods: {
        async cargarUsuarios() {
            try {
            const response = await fetch('http://localhost:3000/api/usuarios');
            if (!response.ok) {
                throw new Error('Error al cargar los usuarios');
            }
            this.usuarios = await response.json();
            } catch (error) {
            console.error(error);
            }
        }
    },
    mounted() {
      this.cargarUsuarios();
    }
  };
  </script>
  
  