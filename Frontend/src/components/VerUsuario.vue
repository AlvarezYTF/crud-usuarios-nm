<template>
    <div class="container mt-5 d-flex justify-content-center">
        <div class="card p-4" style="width: 100%; max-width: 800px;">
            <h3 class="fw-bold mb-4">Detalles del usuario</h3>

            <div class="row g-3 mb-3">
                <div class="col">
                    <label class="form-label">Tipo de documento</label>
                    <input type="text" class="form-control" :value="usuario.tipoDocumento" disabled />
                </div>
                <div class="col">
                    <label class="form-label">Número de documento</label>
                    <input type="text" class="form-control" :value="usuario.numeroDocumento" disabled />
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col">
                    <label class="form-label">Primer nombre</label>
                    <input type="text" class="form-control" :value="usuario.primerNombre" disabled />
                </div>
                <div class="col">
                    <label class="form-label">Segundo nombre</label>
                    <input type="text" class="form-control" :value="usuario.segundoNombre" disabled />
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col">
                    <label class="form-label">Primer apellido</label>
                    <input type="text" class="form-control" :value="usuario.primerApellido" disabled />
                </div>
                <div class="col">
                    <label class="form-label">Segundo apellido</label>
                    <input type="text" class="form-control" :value="usuario.segundoApellido" disabled />
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col">
                    <label class="form-label">Teléfono</label>
                    <input type="text" class="form-control" :value="usuario.telefono" disabled />
                </div>
                <div class="col">
                    <label class="form-label">Dirección</label>
                    <input type="text" class="form-control" :value="usuario.direccion" disabled />
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col">
                    <label class="form-label">Fecha de nacimiento</label>
                    <input type="text" class="form-control" :value="formatFecha(usuario.fechaNacimiento)" disabled />
                </div>
                <div class="col">
                    <label class="form-label">Ciudad</label>
                    <input type="text" class="form-control" :value="usuario.ciudad" disabled />
                </div>
            </div>

            <div class="row g-3 mb-3">
                <div class="col">
                    <label class="form-label">Nacionalidad</label>
                    <input type="text" class="form-control" :value="usuario.pais" disabled />
                </div>
                <div class="col">
                    <label class="form-label">Lugar de nacimiento</label>
                    <input type="text" class="form-control" :value="usuario.lugarNacimiento" disabled />
                </div>
            </div>

            <div class="mb-3 text-center" v-if="usuario.imagen">
                <label class="form-label">Imagen de perfil</label>
                <div>
                    <img :src="`http://localhost:3000/uploads/${usuario.imagen}`" class="img-fluid rounded shadow"
                        style="max-height: 200px;" />
                </div>
            </div>

            <button class="btn btn-secondary w-100" @click="$router.push('/usuarios')">Volver</button>
        </div>
    </div>
</template>

<script>
import userService from '../services/userService';

export default {
    name: 'VerUsuario',
    data() {
        return {
            usuario: {}
        };
    },
    methods: {
        async cargarUsuario() {
            try {
                const id = this.$route.params.id;
                const response = await userService.getUserId(id);
                this.usuario = response.data;
            } catch (error) {
                console.error('Error al obtener usuario:', error);
            }
        },
        formatFecha(fecha) {
            return new Date(fecha).toLocaleDateString();
        }
    },
    mounted() {
        this.cargarUsuario();
    }
};
</script>