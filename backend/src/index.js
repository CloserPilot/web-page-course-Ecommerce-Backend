import dotenv from 'dotenv';
import sequelize from './config/database.js';
import server from './server.js';

dotenv.config(
  { path: './.env' }
);

server.get('/', (req, res) => {
  res.send('Servidor Express funcionando 🚀');
});

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos conectada ✅');

    server.listen(process.env.PORT || 8000, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.error('Error al conectar la DB ❌', error);
  }
}

startServer();