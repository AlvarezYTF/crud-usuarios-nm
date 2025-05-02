const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const path = require('path');
const open = require('open');


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    import('open').then(open => {
      open.default(`http://localhost:${PORT}/editarUsuario.html`);
    });
  });  
}).catch((err) => {
  console.error('❌ Error al conectar con MongoDB:', err);
});
