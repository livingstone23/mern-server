const Task = require('../models/Task');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


//Crea una nueva tarea
exports.crearTarea = async (req, res) => {

    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array() })
    }

   
    try {
         //Extraer el proyecto y comprobar que existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
            
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado'});
        }

        //creamos la tarea
        const task = new Task(req.body);
        await task.save()
        res.json({ task });
        
    }catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtener tareas del proyecto
exports.obtenerTareas = async (req, res ) => {

try {
    //Extraer el proyecto y comprobar que existe
    //const { proyecto } = req.body;

    //Al pasarse por el cliente desde params debe cambiarse de req.body a req.query
    const { proyecto } = req.query;

    const existeProyecto = await Proyecto.findById(proyecto)
    if(!existeProyecto) {
        return res.status(404).json({ msg: 'Proyecto no encontrado' })
        
    }

    //Revisar si el proyecto actual pertenece al usuario autenticado
    if(existeProyecto.creador.toString() !== req.usuario.id) {
        return res.status(401).json({ msg: 'No autorizado'});
    }

    //Obtener las tareas por proyecto
    //const tasks = await Task.find({ proyecto });

    const tasks = await Task.find({ proyecto }).sort({ creado: -1 });
    res.json({ tasks });

    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar la tarea
exports.actualiarTarea = async (req, res ) => {

    try {
         //Extraer el proyecto y comprobar que existe
        const { proyecto, nombre, estado } = req.body;

        //Si la tarea existe o no
        let existeTarea = await Task.findById(req.params.id);

        if(!existeTarea) {
            return res.status(404).json({ msg: 'Tarea no encontrada' });
        }

        //Extraer el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
            
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado'});
        }
        
        //Crear un objeto con la nueva informacion
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;
        //nuevaTarea.proyecto = proyecto;
        //nuevaTarea.id = req.params.id;

        //Guardar la tarea
        task = await Task.findOneAndUpdate({ _id : req.params.id}, nuevaTarea, { new : true });
        res.json({ task });

    } catch( error ) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarTarea = async ( req, res ) => {

    try {

         //Extraer el proyecto y comprobar que existe
         //const { proyecto } = req.body;

         //Al pasarse por el cliente desde params debe cambiarse de req.body a req.query
         const { proyecto } = req.query;

         //Si la tarea existe o no
         let existeTarea = await Task.findById(req.params.id); 

         if(!existeTarea) {
             return res.status(404).json({ msg: 'Tarea no encontrada' });
         }
 
         //Extraer el proyecto
         let existeProyecto = await Proyecto.findById(proyecto);

         if(!existeProyecto) {
             return res.status(404).json({ msg: 'Proyecto no encontrado' });
             
         }
 
         //Revisar si el proyecto actual pertenece al usuario autenticado
         if(existeProyecto.creador.toString() !== req.usuario.id) {
             return res.status(401).json({ msg: 'No autorizado'});
         }
         
         //Eliminar 
         await Task.findOneAndRemove({ _id: req.params.id });
         res.json({ msg: 'Tarea Eliminada' });


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 
