<template>
  <div class="container py-5">
    <div class="bg-white rounded-4 shadow p-4 mx-auto" style="max-width: 700px;">
      <h4 class="text-center mb-4 fw-bold">Actualizar información</h4>

      <form @submit.prevent="actualizarUsuario">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Tipo de documento:</label>
            <div class="col">
              <select id="tipoDocumento" class="form-select" v-model="usuario.tipoDocumento">
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Número de documento:</label>
            <input v-model="usuario.numeroDocumento" type="text" class="form-control"
              placeholder="Número de documento..." />
          </div>

          <div class="col-md-6">
            <label class="form-label">Primer Nombre:</label>
            <input v-model="usuario.primerNombre" type="text" class="form-control" placeholder="Primer nombre..." />
          </div>
          <div class="col-md-6">
            <label class="form-label">Segundo Nombre:</label>
            <input v-model="usuario.segundoNombre" type="text" class="form-control" placeholder="Segundo nombre..." />
          </div>

          <div class="col-md-6">
            <label class="form-label">Primer Apellido:</label>
            <input v-model="usuario.primerApellido" type="text" class="form-control" placeholder="Primer apellido..." />
          </div>
          <div class="col-md-6">
            <label class="form-label">Segundo Apellido:</label>
            <input v-model="usuario.segundoApellido" type="text" class="form-control"
              placeholder="Segundo apellido..." />
          </div>

          <div class="col-md-6">
            <label class="form-label">Teléfono:</label>
            <input v-model="usuario.telefono" type="text" class="form-control" placeholder="Teléfono..." />
          </div>
          <div class="col-md-6">
            <label class="form-label">Dirección:</label>
            <input v-model="usuario.direccion" type="text" class="form-control" placeholder="Dirección..." />
          </div>

          <div class="col-md-6">
            <label class="form-label">Fecha de nacimiento:</label>
            <input v-model="usuario.fechaNacimiento" type="date" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Nacionalidad:</label>
            <input v-model="usuario.pais" type="text" class="form-control" placeholder="Nacionalidad..." />
          </div>

          <div class="col-md-6">
            <label class="form-label">Lugar de nacimiento:</label>
            <input v-model="usuario.lugarNacimiento" type="text" class="form-control"
              placeholder="Lugar de nacimiento..." />
          </div>

          <div class="d-flex justify-content-between mt-4">
            <button type="button" class="btn btn-danger px-4" @click="this.$router.push('/usuarios')">Cancelar</button>
            <button type="submit" class="btn btn-dark px-4">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import userService from '@/services/userService';

export default {
  name: 'UserEditForm',
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      usuario: {
        tipoDocumento: '',
        numeroDocumento: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        direccion: '',
        fechaNacimiento: '',
        nacionalidad: '',
        lugarNacimiento: '',
      },
    };
  },
  methods: {
    async cargarUsuario() {
      try {
        const id = this.$route.params.id;
        const response = await userService.getUserId(id);
        const usuario = response.data;

        // 🟢 Transformar la fecha a formato YYYY-MM-DD para input date
        if (usuario.fechaNacimiento) {
          usuario.fechaNacimiento = new Date(usuario.fechaNacimiento).toISOString().slice(0, 10);
        }

        this.usuario = usuario;
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    },
    async actualizarUsuario() {
      try {
        const id = this.$route.params.id;
        const response = await userService.actualizarUsuario(id, this.usuario);

        if (response.status === 200) {
          alert('Usuario actualizado correctamente');
          this.$router.push('/usuarios'); // ← Redirige después de actualizar
        } else {
          alert('Error al actualizar usuario');
        }
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        alert('Error al enviar la solicitud');
      }
    }
  },
  mounted() {
    this.cargarUsuario();
  },
};
</script>