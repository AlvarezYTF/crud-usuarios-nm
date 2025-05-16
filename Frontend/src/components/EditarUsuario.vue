<template>
  <div class="container py-5">
    <div class="bg-white rounded-4 shadow p-4 mx-auto" style="max-width: 700px">
      <h4 class="text-center mb-4 fw-bold">Actualizar información</h4>

      <div class="mb-3 text-center">
        <img
          v-if="usuario.imagen"
          :src="
            usuario.imagen
              ? `http://localhost:3000/uploads/${usuario.imagen}`
              : imagenPorDefecto
          "
          class="rounded-circle shadow pointer"
          alt="Imagen de perfil"
          style="
            width: 150px;
            height: 150px;
            object-fit: cover;
            border: 4px solid #2c3e50;
          "
          @click="openModal"
        />
      </div>

      <!-- Modal -->
      <div id="myModal" class="modal" v-if="mostrarModal">
        <div class="modal-content">
          <div class="mb-3 text-center">
            <img
              v-if="nuevaImagen"
              :src="nuevaImagen"
              class="rounded-circle shadow pointer"
              alt="Nueva imagen de perfil"
              style="
                width: 150px;
                height: 150px;
                object-fit: cover;
                border: 4px solid #2c3e50;
              "
            />
            <img
              v-else-if="usuario.imagen"
              :src="`http://localhost:3000/uploads/${usuario.imagen}`"
              class="rounded-circle shadow pointer"
              alt="Imagen de perfil"
              style="
                width: 150px;
                height: 150px;
                object-fit: cover;
                border: 4px solid #2c3e50;
              "
            />
          </div>
          <span class="close" @click="cerrarModal">&times;</span>
          <h2>Actualizar imagen</h2>
          <input type="file" @change="onFileChange" accept="image/*" />
          <button @click="actualizarImagen">Actualizar Imagen</button>
        </div>
      </div>

      <form @submit.prevent="actualizarUsuario">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Tipo de documento:</label>
            <div class="col">
              <select
                id="tipoDocumento"
                class="form-select"
                v-model="usuario.tipoDocumento"
              >
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label">Número de documento:</label>
            <input
              v-model="usuario.numeroDocumento"
              type="text"
              class="form-control"
              placeholder="Número de documento..."
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Primer Nombre:</label>
            <input
              v-model="usuario.primerNombre"
              type="text"
              class="form-control"
              placeholder="Primer nombre..."
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Segundo Nombre:</label>
            <input
              v-model="usuario.segundoNombre"
              type="text"
              class="form-control"
              placeholder="Segundo nombre..."
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Primer Apellido:</label>
            <input
              v-model="usuario.primerApellido"
              type="text"
              class="form-control"
              placeholder="Primer apellido..."
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Segundo Apellido:</label>
            <input
              v-model="usuario.segundoApellido"
              type="text"
              class="form-control"
              placeholder="Segundo apellido..."
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Teléfono:</label>
            <input
              v-model="usuario.telefono"
              type="text"
              class="form-control"
              placeholder="Teléfono..."
              maxlength="10"
              pattern="[0-9]*"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Dirección:</label>
            <input
              v-model="usuario.direccion"
              type="text"
              class="form-control"
              placeholder="Dirección..."
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Fecha de nacimiento:</label>
            <input
              v-model="usuario.fechaNacimiento"
              type="date"
              class="form-control"
            />
          </div>
          <div class="col">
            <label class="form-label">Ciudad</label>
            <input type="text" class="form-control" v-model="usuario.ciudad" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Nacionalidad:</label>
            <input
              v-model="usuario.pais"
              type="text"
              class="form-control"
              placeholder="Nacionalidad..."
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Lugar de nacimiento:</label>
            <input
              v-model="usuario.lugarNacimiento"
              type="text"
              class="form-control"
              placeholder="Lugar de nacimiento..."
            />
          </div>

          <div class="d-flex justify-content-between mt-4">
            <button
              type="button"
              class="btn btn-danger px-4"
              @click="this.$router.go(-1)"
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-dark px-4">Actualizar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import userService from "@/services/userService";
import Swal from "sweetalert2";
export default {
  name: "UserEditForm",
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      usuario: {
        tipoDocumento: "",
        numeroDocumento: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        telefono: "",
        direccion: "",
        fechaNacimiento: "",
        nacionalidad: "",
        lugarNacimiento: "",
        ciudad: "",
        imagen: "", // Asegúrate de incluir la propiedad imagen
      },
      mostrarModal: false,
      selectedFile: null,
      nuevaImagen: null, // Para almacenar la nueva imagen seleccionada
    };
  },
  methods: {
    async cargarUsuario() {
      try {
        const id = this.$route.params.id;
        const response = await userService.getUserId(id);
        const usuario = response.data;

        // Transformar la fecha a formato YYYY-MM-DD para input date
        if (usuario.fechaNacimiento) {
          usuario.fechaNacimiento = new Date(usuario.fechaNacimiento)
            .toISOString()
            .slice(0, 10);
        }

        this.usuario = usuario;
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    },
    openModal() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevaImagen = null; // Reiniciar la nueva imagen al cerrar el modal
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.nuevaImagen = e.target.result; // Actualiza la nueva imagen
      };
      reader.readAsDataURL(this.selectedFile); // Lee el archivo como URL de datos
    },
    async actualizarImagen() {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append("imagen", this.selectedFile);
      }
    
      try {
        const id = this.$route.params.id;
        const response = await userService.actualizarUsuario(id, formData);
    
        console.log(response);
    
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Imagen actualizada correctamente',
            confirmButtonColor: '#2c3e50',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Verifica la estructura de la respuesta antes de acceder a 'imagen'
            if (response.data && response.data.imagen) {
              this.usuario.imagen = response.data.imagen;
              this.cerrarModal(); // Cierra el modal después de actualizar la imagen
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La imagen no fue actualizada correctamente',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
              });
            }
          });
        }
      } catch (error) {
        console.error("Error al actualizar la imagen:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al enviar la solicitud',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      }
    },
  async actualizarUsuario() {
    const formData = new FormData();
  
    // Agregar todos los datos del usuario a formData
    Object.entries(this.usuario).forEach(([key, value]) => {
      if (key !== '_id' && key !== 'imagen') {
        formData.append(key, value);
      }
    });
  
    // Agregar la imagen si se ha seleccionado una
    if (this.selectedFile) {
      formData.append("imagen", this.selectedFile);
    }
  
    try {
      // Validar edad
      if (this.usuario.fechaNacimiento) {
        const fechaNacimiento = new Date(this.usuario.fechaNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const cumpleEsteAno = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());
        const edadFinal = hoy < cumpleEsteAno ? edad - 1 : edad;
        
        if (edadFinal < 14) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La edad mínima permitida es 14 años',
            confirmButtonColor: '#d33'
          });
          return;
        }
      }
  
      const id = this.$route.params.id;
      const response = await userService.actualizarUsuario(id, formData);
  
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Usuario actualizado correctamente',
          confirmButtonColor: '#2c3e50',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.$router.go(-1);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar usuario',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes completar todos los campos',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      });
    }
  }
},
  mounted() {
    this.cargarUsuario();
  },
};
</script>

<style scoped>
.modal {
  display: block; /* Show modal */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
