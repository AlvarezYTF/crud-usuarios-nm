<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card p-4 text-center" v-if="usuario" style="width: 100%; max-width: 800px;">
      <h3 class="fw-bold mb-4">Detalles del usuario</h3>
      
      <!-- Imagen en cabecera -->
      <div class="mb-3">
        <img 
          v-if="usuario.imagen"
          :src="usuario.imagen ? `http://localhost:3000/uploads/${usuario.imagen}` : imagenPorDefecto"
          class="rounded-circle shadow"
          alt="Imagen de perfil"
          style="width: 150px; height: 150px; object-fit: cover; border: 4px solid #2c3e50;"
        />
      </div>


      <div class="row g-3 mb-3 text-start">
        <div class="col">
          <label class="form-label">Tipo de documento</label>
          <input type="text" class="form-control" :value="usuario.tipoDocumento" disabled />
        </div>
        <div class="col">
          <label class="form-label">Número de documento</label>
          <input type="text" class="form-control" :value="usuario.numeroDocumento" disabled />
        </div>
      </div>

      <div class="row g-3 mb-3 text-start">
        <div class="col">
          <label class="form-label">Primer nombre</label>
          <input type="text" class="form-control" :value="usuario.primerNombre" disabled />
        </div>
        <div class="col">
          <label class="form-label">Segundo nombre</label>
          <input type="text" class="form-control" :value="usuario.segundoNombre" disabled />
        </div>
      </div>

      <div class="row g-3 mb-3 text-start">
        <div class="col">
          <label class="form-label">Primer apellido</label>
          <input type="text" class="form-control" :value="usuario.primerApellido" disabled />
        </div>
        <div class="col">
          <label class="form-label">Segundo apellido</label>
          <input type="text" class="form-control" :value="usuario.segundoApellido" disabled />
        </div>
      </div>

      <div class="row g-3 mb-3 text-start">
        <div class="col">
          <label class="form-label">Teléfono</label>
          <input type="text" class="form-control" :value="usuario.telefono" disabled />
        </div>
        <div class="col">
          <label class="form-label">Dirección</label>
          <input type="text" class="form-control" :value="usuario.direccion" disabled />
        </div>
      </div>

      <div class="row g-3 mb-3 text-start">
        <div class="col">
          <label class="form-label">Fecha de nacimiento</label>
          <input type="text" class="form-control" :value="formatFecha(usuario.fechaNacimiento)" disabled />
        </div>
        <div class="col">
          <label class="form-label">Ciudad</label>
          <input type="text" class="form-control" :value="usuario.ciudad" disabled />
        </div>
      </div>

      <div class="row g-3 mb-3 text-start">
        <div class="col">
          <label class="form-label">Nacionalidad</label>
          <input type="text" class="form-control" :value="usuario.pais" disabled />
        </div>
        <div class="col">
          <label class="form-label">Lugar de nacimiento</label>
          <input type="text" class="form-control" :value="usuario.lugarNacimiento" disabled />
        </div>
      </div>

      
      <div class="row g-3 mb-3 text-start d-flex justify-content-center">
        <button class="btn btn-danger w-40 mt-4 col-4" @click="$router.push('/')">Salir</button>
        <router-link :to="{ name: 'EditarUsuario', params: { id: usuario._id } }"
        class="btn btn-success w-40 mt-4 ms-3 col-4">Actulizar datos</router-link>
      </div>
    </div>

    <div v-else class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  </div>
</template>


<script>
import userService from '@/services/userService';

export default {
  name: 'PerfilUsuario',
  data() {
    return {
      usuario: null
    };
  },
  methods: {
    async cargarPerfil() {
      try {
        const response = await userService.perfilUsuario();
        this.usuario = response.data;
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          this.$router.push('/');
        }
      }
    },
    formatFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  mounted() {
    this.cargarPerfil();
  }
};
</script>
