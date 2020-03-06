//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');


// Crea un usuario
// api/usuarios
router.post('/', 
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','Agrega un Email valido').isEmail()
],
    usuarioController.crearUsuario
);


module.exports = router;




























