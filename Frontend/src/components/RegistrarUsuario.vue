<template>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card p-4" style="width: 100%; max-width: 800px;">
      <div v-if="pasoActual === 1">
        <h3 class="fw-bold mb-3">Formulario de registro</h3>
        <form id="formPaso1" @submit.prevent>
          <div class="row g-3 mb-3">
            <div class="col">
              <select id="tipoDocumento" class="form-select" v-model="formulario.tipoDocumento">
                <option disabled value="">Tipo de documento</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="TI">Tarjeta de identidad</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
            <div class="col">
              <input type="text" id="numeroDocumento" class="form-control" placeholder="Número de documento"
                v-model="formulario.numeroDocumento" />
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col">
              <input type="text" id="primerNombre" class="form-control" placeholder="Primer nombre"
                v-model="formulario.primerNombre" />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Segundo nombre" v-model="formulario.segundoNombre" />
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col">
              <input type="text" id="primerApellido" class="form-control" placeholder="Primer apellido"
                v-model="formulario.primerApellido" />
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Segundo apellido"
                v-model="formulario.segundoApellido" />
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col">
              <input type="tel" id="telefono" class="form-control" placeholder="Teléfono"
                v-model="formulario.telefono" />
            </div>
            <div class="col">
              <input type="text" id="direccion" class="form-control" placeholder="Dirección"
                v-model="formulario.direccion" />
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col">
              <input type="date" id="fechaNacimiento" class="form-control" v-model="formulario.fechaNacimiento" />
            </div>
            <div class="col">
              <input type="text" id="ciudad" class="form-control" placeholder="Ciudad de residencia"
                v-model="formulario.ciudad" />
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col">
              <input type="text" id="nacionalidad" class="form-control" placeholder="Nacionalidad"
                v-model="formulario.pais" />
            </div>
            <div class="col">
              <input type="text" id="lugarNacimiento" class="form-control" placeholder="Lugar de nacimiento"
                v-model="formulario.lugarNacimiento" />
            </div>
          </div>

          <div class="mb-4">
            <label>Imagen de perfil</label>
            <input type="file" class="form-control" @change="handleFileUpload" />
          </div>
          
          <button type="submit" class="btn btn-dark w-100">Siguiente</button>
        </form>
        <div class="login-link">
          <p>¿Ya tienes cuenta inicia sesión? <a href="/">Inicia Sesión</a></p>
        </div>
      </div>

      <!-- Paso 2: Crear cuenta -->
      <div v-else-if="pasoActual === 2">
        <h3 class="fw-bold mb-3">Crea tu cuenta</h3>
        <form id="formPaso2" @submit.prevent>
          <div class="mb-3">
            <label>Correo electrónico</label>
            <input type="email" id="correo" class="form-control" v-model="formulario.correo" placeholder="Ingresa un correo"/>
          </div>

          <div class="mb-3">
            <label>Contraseña</label>
            <div class="input-group">
              <input :type="mostrarPass ? 'text' : 'password'" id="contrasena" class="form-control"
                v-model="formulario.contrasena" placeholder="Ingresa una contraseña" />
              <button type="button" class="btn btn-outline-secondary" @click="mostrarPass = !mostrarPass">
                <i :class="mostrarPass ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <div class="mb-3">
            <label>Confirmar contraseña</label>
            <div class="input-group">
              <input :type="mostrarConfirm ? 'text' : 'password'" id="confirmarContrasena" class="form-control"
                v-model="formulario.confirmarContrasena" placeholder="Confirmar contraseña"/>
              <button type="button" class="btn btn-outline-secondary" @click="mostrarConfirm = !mostrarConfirm">
                <i :class="mostrarConfirm ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-dark w-100">Crear cuenta</button>
        </form>
        <div class="login-link">
          <p>¿Ya tienes cuenta inicia sesión? <a href="/">Inicia Sesión</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JustValidate from 'just-validate';
import userService from '@/services/userService';
import { nextTick } from 'vue';

export default {
  name: 'RegistroCompleto',
  data() {
    return {
      pasoActual: 1,
      mostrarPass: false,
      mostrarConfirm: false,
      archivoImagen: null,
      formulario: {
        tipoDocumento: '',
        numeroDocumento: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        pais: '',
        fechaNacimiento: '',
        lugarNacimiento: '',
        imagen: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: ''
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      this.archivoImagen = event.target.files[0];
    },
    async crearCuenta() {
      const formData = new FormData();
      for (const key in this.formulario) {
        if (key !== 'confirmarContrasena') {
          formData.append(key, this.formulario[key]);
        }
      }
      if (this.archivoImagen) {
        formData.append('imagen', this.archivoImagen);
      }
      try {
        await userService.registrarUsuario(formData);
        alert('✅ Usuario registrado correctamente');
        this.pasoActual = 1;
      } catch (error) {
        console.error(error.response?.data || error);
        alert('❌ Error al registrar usuario');
      }
    }
  },
  mounted() {
    const val1 = new JustValidate('#formPaso1');
    val1
      .addField('#tipoDocumento', [
        { rule: 'required', errorMessage: 'Tipo de documento obligatorio' }
      ])
      .addField('#numeroDocumento', [
        { rule: 'required', errorMessage: 'Número obligatorio' },
        { rule: 'customRegexp', value: /^[a-zA-Z0-9]+$/, errorMessage: 'Solo letras y números' }
      ])
      .addField('#primerNombre', [
        { rule: 'required', errorMessage: 'Nombre obligatorio' }
      ])
      .addField('#primerApellido', [
        { rule: 'required', errorMessage: 'Apellido obligatorio' }
      ])
      .addField('#ciudad', [
        { rule: 'required', errorMessage: 'Ciudad de residencia es obligatorio' }
      ])
      .addField('#nacionalidad', [
        { rule: 'required', errorMessage: 'La nacionalidad es obligatorio' }
      ])
      .addField('#telefono', [
        { rule: 'required', errorMessage: 'El telefono es obligatorio' }
      ])
      .addField('#fechaNacimiento', [
        {
          validator: (value) => {
            if (!value) return false;
            const fechaNacimiento = new Date(value);
            const hoy = new Date();
            const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const cumpleEsteAno = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());
            const edadFinal = hoy < cumpleEsteAno ? edad - 1 : edad;
            return edadFinal >= 14 && edadFinal <= 120;
          },
          errorMessage: 'Debes tener entre 14 y 120 años'
        }
      ])
      .addField('#lugarNacimiento', [
        { rule: 'required', errorMessage: 'El lugar de nacimiento es obligatoria' }
      ])
    .onSuccess(() => {
      this.pasoActual = 2;
    });
},
watch: {
  pasoActual(nuevoPaso) {
    if (nuevoPaso === 2) {
      nextTick(() => {
        const val2 = new JustValidate('#formPaso2');
        val2
          .addField('#correo', [
            { rule: 'required', errorMessage: 'Correo requerido' },
            { rule: 'email', errorMessage: 'Correo inválido' }
          ])
          .addField('#contrasena', [
            { rule: 'required', errorMessage: 'Contraseña requerida' },
            { rule: 'minLength', value: 6, errorMessage: 'Mínimo 6 caracteres' }
          ])
          .addField('#confirmarContrasena', [
            {
              validator: (value, fields) => {
                return value === fields['#contrasena'].elem.value;
              },
              errorMessage: 'Las contraseñas no coinciden'
            }
          ])
          .onSuccess(() => {
            this.crearCuenta();
          });
      });
    }
  }
}

};
</script>

<style scoped>

.container {
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif !important;
}

input::placeholder {
  color: gray;
  font-size: 14px;
  font-style: italic;
  opacity: 0.7;
}

.card {
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 2rem !important; /* más espacio interno */
}

.login-link {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.login-link a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>