const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', userRoutes);

try{
  app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}catch(e) {
 console.log(e)
};
