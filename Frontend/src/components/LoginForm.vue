<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <form id="loginForm" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="email@address.com"
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="********"
        />
      </div>
      <button type="submit" :disabled="isSubmitting">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import JustValidate from 'just-validate';
import Swal from 'sweetalert2';
import authService from '../services/userService';
import { nextTick } from 'vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      isSubmitting: false,
      validador: null,
    };
  },
  methods: {
    async handleLogin() {
      const valid = await this.validador.validate();
      if (!valid) {
        Swal.fire({
          icon: 'warning',
          title: 'Formulario inválido',
          text: 'Por favor completa correctamente los campos',
          confirmButtonColor: '#2c3e50',
        });
        return;
      }

      this.isSubmitting = true;
      try {
        const response = await authService.login(this.email, this.password);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido al sistema',
          confirmButtonColor: '#2c3e50',
        });
        console.log(response);
        // Redirige si lo necesitas, por ejemplo:
        // this.$router.push('/usuarios');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: error.response?.data?.message || error.message,
          confirmButtonColor: '#d33',
        });
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  mounted() {
    nextTick(() => {
      this.validador = new JustValidate('#loginForm');
      this.validador
        .addField('#email', [
          { rule: 'required', errorMessage: 'El correo es obligatorio' },
          { rule: 'email', errorMessage: 'Correo inválido' },
        ])
        .addField('#password', [
          { rule: 'required', errorMessage: 'La contraseña es obligatoria' },
          { rule: 'minLength', value: 6, errorMessage: 'Mínimo 6 caracteres' },
        ]);
    });
  },
};
</script>

<style scoped>
/* tus estilos siguen intactos */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.register-link a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
