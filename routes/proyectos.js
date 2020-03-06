//Rutas para authenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');


// Crea un proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

//Obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

//Actualizar proyecto via ID
router.put('/:id', 
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//Eliminar un proyecto 
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;