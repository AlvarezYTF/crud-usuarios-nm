<template>
    <div class="container py-5">
      <div class="bg-white rounded-4 shadow p-4 mx-auto" style="max-width: 400px;">
        <h4 class="text-center mb-4 fw-bold">Cambiar contraseña</h4>
  
        <form @submit.prevent="cambiarPassword">
          <div class="mb-3 position-relative">
            <label class="form-label">Contraseña</label>
            <input :type="verPassword ? 'text' : 'password'" v-model="password" class="form-control" placeholder="••••••••••" required>
            <span class="fa toggle-password" :class="verPassword ? 'fa-eye-slash' : 'fa-eye'" @click="verPassword = !verPassword"
              style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); cursor: pointer; color: #6c757d;"></span>
          </div>
  
          <div class="mb-4 position-relative">
            <label class="form-label">Confirmar contraseña</label>
            <input :type="verConfirm ? 'text' : 'password'" v-model="confirmPassword" class="form-control" placeholder="••••••••••" required>
            <span class="fa toggle-password" :class="verConfirm ? 'fa-eye-slash' : 'fa-eye'" @click="verConfirm = !verConfirm"
              style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); cursor: pointer; color: #6c757d;"></span>
          </div>
  
          <button type="submit" class="btn btn-primary w-100 fw-bold">Cambiar contraseña</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ChangePasswordForm',
    props: {
      userId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        password: '',
        confirmPassword: '',
        verPassword: false,
        verConfirm: false
      };
    },
    methods: {
      async cambiarPassword() {
        if (this.password !== this.confirmPassword) {
          alert('Las contraseñas no coinciden.');
          return;
        }
  
        try {
          const respuesta = await fetch(`http://localhost:3000/api/users/${this.userId}/password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: this.password })
          });
  
          const resultado = await respuesta.json();
  
          if (respuesta.ok) {
            alert('Contraseña actualizada correctamente');
          } else {
            alert('Error: ' + resultado.message);
          }
        } catch (error) {
          console.error(error);
          alert('Error al enviar la solicitud');
        }
      }
    }
  };
  </script>
  