import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export default {
  mostrarsUsuarios() {
    return axios.get(`${BASE_URL}/users`);
  },

  registrarUsuario(usuario) {
    return axios.post(`${BASE_URL}/users`, usuario);
  },
  

  login(email, password) {
    return axios.post(`${BASE_URL}/login`, {
      correo: email,
      contrasena: password
    });
  }
};