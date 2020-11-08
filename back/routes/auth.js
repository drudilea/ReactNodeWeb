/*
  Root: /api/auth
*/

const { Router } = require('express');
const {
  login,
  register,
  renewToken,
  validateToken,
} = require('../controllers/auth');
const { check } = require('express-validator');
const { filedsValidation } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Login
router.post(
  '/login',
  [
    check('password', 'Password is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    filedsValidation,
  ],
  login
);

// Register
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    filedsValidation,
  ],
  register
);

// Validar JWT
router.get('/validate', validarJWT, validateToken);

// Actualizar JWT
router.get('/renew', validarJWT, renewToken);

module.exports = router;
