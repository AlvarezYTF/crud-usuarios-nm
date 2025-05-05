<template>
    <div class="dashboard">
      <h2>Bienvenido, {{ usuario.primerNombre }} {{ usuario.primerApellido }}</h2>
  
      <div class="perfil">
        <img
          v-if="usuario.imagen"
          :src="`http://localhost:3000/uploads/${usuario.imagen}`"
          alt="Foto de perfil"
          width="150"
        />
        <p v-else>No hay imagen de perfil</p>
  
        <form @submit.prevent="actualizarImagen">
          <input type="file" @change="handleFile" />
          <button type="submit">Actualizar Imagen</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Dashboard',
    data() {
      return {
        usuario: {},
        imagen: null,
      };
    },
    methods: {
      async obtenerPerfil() {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:3000/api/perfil', {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.usuario = res.data;
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
        }
      },
      handleFile(event) {
        this.imagen = event.target.files[0];
      },
      async actualizarImagen() {
        if (!this.imagen) return;
  
        const formData = new FormData();
        formData.append('imagen', this.imagen);
        formData.append('id', this.usuario._id);
  
        try {
          const res = await axios.post(
            'http://localhost:3000/api/users/imagen',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          this.usuario.imagen = res.data.imagen;
          alert('Imagen actualizada correctamente');
        } catch (error) {
          console.error('Error al actualizar la imagen:', error);
        }
      },
    },
    mounted() {
      this.obtenerPerfil();
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    max-width: 600px;
    margin: auto;
    text-align: center;
  }
  img {
    border-radius: 50%;
    margin-bottom: 10px;
  }
  </style>