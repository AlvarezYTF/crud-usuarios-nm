<template>
    <div class="image-list">
      <div v-for="(item, index) in items" :key="index" class="image-item">
        <img
          :src="item.imageUrl"
          @click="openImageModal(index)"
          class="thumbnail"
          alt="Imagen"
        />
      </div>
  
      <!-- Modal para vista previa y cambio -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <img :src="selectedImage" class="large-image" alt="Vista previa" />
          <input type="file" @change="changeImage" />
          <button @click="closeModal">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageGallery',
    data() {
      return {
        items: [
          {
            imageUrl: require('@/assets/232ef85c-4054-476c-af02-7242e1e3aa27.png'),
          },
        ],
        selectedImage: null,
        showModal: false,
        selectedIndex: null,
      };
    },
    methods: {
      openImageModal(index) {
        this.selectedIndex = index;
        this.selectedImage = this.items[index].imageUrl;
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      changeImage(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const newImage = e.target.result;
            this.items[this.selectedIndex].imageUrl = newImage;
            this.selectedImage = newImage;
          };
          reader.readAsDataURL(file);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .image-item img.thumbnail {
    width: 100px;
    cursor: pointer;
    margin: 10px;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    text-align: center;
  }
  .large-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    margin-bottom: 10px;
  }
  </style>