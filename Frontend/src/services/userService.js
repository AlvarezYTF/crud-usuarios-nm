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
  },

  actualizarUsuario(id, usuario) {
    return axios.put(`${BASE_URL}/users/${id}`, usuario, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
  },

  eliminarUsuario(id) {
    return axios.delete(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },
  updateUserImage(id, imagenFile) {
    const formData = new FormData();
    formData.append('imagen', imagenFile);
  
    return axios.put(`${BASE_URL}/users/${id}/image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};




