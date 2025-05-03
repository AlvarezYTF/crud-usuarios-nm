import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export default {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, {
      correo: email,
      contrasena: password,
    });
    return response.data;
  },
};