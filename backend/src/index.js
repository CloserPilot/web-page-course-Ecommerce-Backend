import dotenv from 'dotenv';
import sequelize from './config/database.js';
import app from './server.js';
import { loadDefaultProducts } from './controllers/product.controller.js'

dotenv.config(
  { path: './.env' }
);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos conectada ✅');

    await loadDefaultProducts();

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error('Error al conectar la DB ❌', error);
  }
}

startServer();