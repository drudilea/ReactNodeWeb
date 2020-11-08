/*
  Root: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { filedsValidation } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();
const { getUsers, deleteUser } = require('../controllers/users');

// ====================================
// Obtener todos los users
// ====================================
router.get('/', validarJWT, getUsers);

// ====================================
// Eliminar un usuario por id
// ====================================
router.delete('/:id', validarJWT, deleteUser);

module.exports = router;
