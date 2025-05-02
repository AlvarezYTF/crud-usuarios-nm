const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./backend/routes/userRoutes');
const connectDB = require('./backend/config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
import userRoutes from './routes/userRoutes.js'
app.use('/uploads', express.static('uploads'));
app.use('/userRoutes', userRoutes);

try{
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

}catch(e) {
 console.log(e)
};