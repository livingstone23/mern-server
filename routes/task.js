//Rutas para authenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// Crea un proyectos
// api/tasks
router.post('/',
    auth,
    [
        check('nombre','El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto','El Proyecto es obligatorio').not().isEmpty()
    ],
    taskController.crearTarea
)

//Obtener las tareas del proyecto
router.get('/',
     auth,
    // [
    //     check('proyecto','El Proyecto es obligatorio').not().isEmpty()
    // ],
    taskController.obtenerTareas
)

//Actualizar tarea
router.put('/:id',
    auth,
    // [
    //     check('nombre','El nombre de la tarea es obligatorio').not().isEmpty(),
    //     check('proyecto','El Proyecto es obligatorio').not().isEmpty()
    // ],
    taskController.actualiarTarea
)
module.exports = router;


//Eliminar tarea
router.delete('/:id',
    auth,
    taskController.eliminarTarea

)
module.exports = router;











