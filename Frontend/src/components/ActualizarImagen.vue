<template>
    <div class="container mt-5">
      <h3 class="mb-4">Actualizar imagen del usuario</h3>
  
      <input type="file" @change="handleFileChange" class="form-control mb-3" />
      <button class="btn btn-primary" @click="actualizarImagen">Actualizar Imagen</button>
  
      <div v-if="mensaje" class="alert alert-info mt-3">{{ mensaje }}</div>
    </div>
  </template>
  
  <script>
  import userService from '../services/userService';
  
  export default {
    name: 'ActualizarImagen',
    data() {
      return {
        imagen: null,
        mensaje: ''
      };
    },
    methods: {
      handleFileChange(e) {
        this.imagen = e.target.files[0];
      },
      async actualizarImagen() {
        try {
          const userId = this.$route.params.id;
          const response = await userService.updateUserImage(userId, this.imagen);
          this.mensaje = response.data.mensaje;
        } catch (error) {
          this.mensaje = 'Error al actualizar imagen';
          console.error(error);
        }
      }
    }
  };
  </script>
  