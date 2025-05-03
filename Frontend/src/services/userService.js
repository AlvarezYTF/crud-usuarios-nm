import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export default {
  obtenerUsuarios() {
    return axios.get(API_URL);
  },
  registrarUsuario(usuario) {
    return axios.post(API_URL, usuario);
  }
};
