<!-- filepath: c:\Users\USUARIO DELL\Downloads\usuarios-nm\Frontend\src\components\LoginForm.vue -->
<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="email@address.com" />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" placeholder="********" />
      </div>
      <button type="submit" :disabled="isSubmitting">Iniciar sesión</button>
    </form>
    <div class="register-link">
      <p>¿No tienes una cuenta? <a href="/registrar">Regístrate aquí</a></p>
    </div>
  </div>
</template>

<script>
import authService from "../services/userService";

export default {
  data() {
    return {
      email: "",
      password: "",
      isSubmitting: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isSubmitting = true;
      try {
        const response = await authService.login(this.email, this.password);

        if (response.status === 200) {
          alert("Inicio de sesión exitoso");
          console.log(response);
        }

      } catch (error) {
        alert("Error al iniciar sesión: " + (error.response?.data?.message || error.message));
      } finally {
        this.isSubmitting = false;
      }
    },
  }

};
</script>

<style scoped>
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
  background-color: #11151a;
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