const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticarUsuario = async (req, res) => {

    // revisar si hay errores 
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array() })
    }

    // Extraer email y password
    const { email, password } = req.body;


    try {
        //Revisar que el usuario sea registrado
        let usuario = await Usuario.findOne({ email });

        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe' });
        }
        
        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto) {
            return res.status(400).json({msg: 'El password es incorrecto' });
        }

        //si todo es correcto retornamos el token correcto
        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        
        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600000
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmacion
            res.json({ token });
        })


    } catch (error) {
        console.log(error);

    }
}

//Obtiene el usuario que esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({ usuario });

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Hubo un error' });

    }


};