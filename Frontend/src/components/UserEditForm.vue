<template>
    <div class="container py-5">
      <div class="bg-white rounded-4 shadow p-4 mx-auto" style="max-width: 700px;">
        <h4 class="text-center mb-4 fw-bold">Actualizar información</h4>
  
        <form @submit.prevent="actualizarUsuario">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Tipo de documento:</label>
              <select v-model="usuario.tipoDocumento" class="form-select">
                <option disabled value="">Tipo de documento</option>
                <option>Cédula</option>
                <option>Tarjeta de Identidad</option>
                <option>Pasaporte</option>
              </select>
            </div>
  
            <div class="col-md-6">
              <label class="form-label">Número de documento:</label>
              <input v-model="usuario.numeroDocumento" type="text" class="form-control" placeholder="Número de documento..." />
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
              <input v-model="usuario.segundoApellido" type="text" class="form-control" placeholder="Segundo apellido..." />
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
              <input v-model="usuario.nacionalidad" type="text" class="form-control" placeholder="Nacionalidad..." />
            </div>
  
            <div class="col-md-6">
              <label class="form-label">Lugar de nacimiento:</label>
              <input v-model="usuario.lugarNacimiento" type="text" class="form-control" placeholder="Lugar de nacimiento..." />
            </div>
  
            <div class="d-flex justify-content-between mt-4">
              <button type="button" class="btn btn-danger px-4" @click="cancelar">Cancelar</button>
              <button type="submit" class="btn btn-dark px-4">Actualizar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
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
  mounted() {
    this.cargarUsuario();
  },
  methods: {
    async cargarUsuario() {
      try {
        const respuesta = await fetch(`http://localhost:3000/api/users/${this.userId}`);
        const datos = await respuesta.json();

        if (respuesta.ok) {
          this.usuario = datos;
        } else {
          alert('Error al cargar usuario: ' + datos.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error al obtener datos del usuario');
      }
    },
    async actualizarUsuario() {
      try {
        const respuesta = await fetch(`http://localhost:3000/api/users/${this.userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.usuario),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
          alert('Usuario actualizado correctamente');
          console.log(resultado);
        } else {
          alert('Error: ' + resultado.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error al enviar la solicitud');
      }
    },
    cancelar() {
      this.$emit('cancel');
    },
  },
};
</script>

  