const jwt = require('jsonwebtoken');


module.exports = function( req, res, next ) {
    //1-Leer el token del header 
    //console.log(token);
    const token = req.header('x-auth-token');

    //2-Revisar si hay token 
    if(!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no válido' });
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }

    //validar el token



} 