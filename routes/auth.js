//Rutas para authenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


// Crea un usuario
// api/auth
router.post('/', 

authController.authenticarUsuario
);


//Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);


module.exports = router;