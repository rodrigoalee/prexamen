const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./App/config/db.config.js');
const router = require('./App/routers/router.js');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Sincronización de la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada sin eliminar datos.');
});

// Uso de las rutas
app.use('/', router);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos UMG" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Inicialización del servidor
const server = app.listen(3000, function () { 
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
