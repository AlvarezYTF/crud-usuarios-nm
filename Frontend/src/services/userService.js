import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export default {
  MostrarUsuarios() {
    return axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },

  getUserId(id) {
    return axios.get(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },

  buscarDocumento(documento) {
    return axios.get(`${BASE_URL}/users/documento/${documento}`);
  },

  registrarUsuario(usuario) {
    return axios.post(`${BASE_URL}/users`, usuario);
  },

  login(email, password) {
    return axios.post(`${BASE_URL}/login`, {
      correo: email,
      contrasena: password
    });
  },

  perfilUsuario() {
    return axios.get(`${BASE_URL}/perfil`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
};