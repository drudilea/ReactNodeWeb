/*
  Root: /api/json-placeholder
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const { getPosts, getPhotos } = require('../controllers/json-placeholders');

// ====================================
// Obtener todos los posts
// ====================================
router.get('/posts', validarJWT, getPosts);

// ====================================
// Obtener todas las fotos
// ====================================
router.get('/photos', validarJWT, getPhotos);

module.exports = router;
