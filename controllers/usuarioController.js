const Usuario = require('../models/usario.model');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async ( req, res) => {

    //Revisamos si hay errores
    const errores = validationResult(req);

    if( !errores.isEmpty() ){
        return res.status(400).json({ errores: errores.array() });
    }

    //extraemos los datos pasados por la API
    const { nombre, contrasena, email, edad, aniosCarnetConducir, jugadorVideojuegos, experienciaVideojuegos, experienciaRealidadVirutal } = req.body;

    try {
        //Comprobamos si el usuario esta ya registrado
        let usuario = await Usuario.findOne({ email });
        
        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        //Si es un usuario nuevo lo creamos
        usuario = new Usuario(req.body);

        //haseamos el password
        const salt = await bcryptjs.genSalt(10);
        usuario.contrasena = await bcryptjs.hash( contrasena, salt);

        await usuario.save();

        //Creamos el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmamos el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 33600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.getUsuarios = async ( req, res) => {
    try {
        let usuarios = await Usuario.find().select('-contrasena');
        for(let i = 0; i<usuarios.length; i++){
            usuarios[i].num = i   
            //console.log(usuarios[i].num) 
        }
        console.log(usuarios[0])
        res.json({ usuarios })
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteUsuario = async ( req, res ) => {
    try {
        await Usuario.findOneAndRemove({ _id : req.params.id })
        res.json({ msg: "Usuario eliminado"})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getUsuario = async ( req, res ) => {
    try {
        const usuario = await Usuario.findById({ _id : req.params.id })
        res.json(usuario)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.editarUsuario = async ( req, res ) => {
    try {
        console.log(req.body)
        let usuarioBBDD = await Usuario.findById(req.body.id)

        if(!usuarioBBDD){
            return res.status(404).json({msg : 'Fallo en la edición de un usuario'})
        }

        const usuario = {}
        usuario.nombre = req.body.nombre
        usuario.contrasena = usuarioBBDD.contrasena
        usuario.email = usuarioBBDD.email
        usuario.edad = usuarioBBDD.edad
        usuario.aniosCarnetConducir = req.body.aniosCarnetConducir
        usuario.jugadorVideojuegos = req.body.jugadorVideojuegos
        usuario.experienciaVideojuegos = req.body.experienciaVideojuegos
        usuario.experienciaRealidadVirtual = req.body.experienciaRealidadVirtual
        usuario.tipoUsuario = req.body.tipoUsuario

        nuevoUsuario = await Usuario.findByIdAndUpdate({_id: req.body.id}, usuario)
        res.json({nuevoUsuario})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}