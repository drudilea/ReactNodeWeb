// Requires (importacion de librerias)
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { dbConnection } = require('./database/config');

// Initialize app
var app = express();
const dev = app.get('env') !== 'production';

/*DEVELOP CONFIG*/
if (dev) {
  require('dotenv').config();
  app.use(morgan('dev'));
}

/*PRODUCTION CONFIG*/
if (!dev) {
  app.disable('x-powered-by');
  app.use(morgan('common'));

  app.use(express.static(path.resolve(__dirname, '../front/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/build', 'index.html'));
  });
}

// CORS config
app.use(cors());

// Body parsing
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// MongoDB connection
dbConnection();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/json-placeholder', require('./routes/json-placeholder'));

// Listen on port 5000
app.listen(process.env.PORT, () => {
  console.log(`Express server puerto ${process.env.PORT}: online`);
});
