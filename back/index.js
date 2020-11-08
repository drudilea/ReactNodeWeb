// Requires (importacion de librerias)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Inicializar app
var app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Conexion a la base de datos
dbConnection();

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/json-placeholder', require('./routes/json-placeholder'));

// Escuchar peticiones en un puerto determinado
app.listen(process.env.PORT, () => {
  console.log(`Express server puerto ${process.env.PORT}: online`);
});
