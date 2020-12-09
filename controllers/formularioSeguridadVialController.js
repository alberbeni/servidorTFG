const FormularioSeguridadVial = require('../models/formularioSeguridadVial.model');
const { validationResult } = require('express-validator');

exports.crearFormulario = async ( req, res) => {
    try {
        const { id_usuario } = req.body
        const form = await FormularioSeguridadVial.aggregate([
            {
                $match : { id_usuario: id_usuario }
            }
        ]);
        if(form.length === 0 ){
            const nuevoFormulario = new FormularioSeguridadVial(req.body)
            nuevoFormulario.save()
            res.json({msg: "formSegVial añadido correctamente"})
        }else{
            //return res.status(400).json({msg: 'Existe un cuestionario creado para este usuario' })  
            let formulario = await FormularioSeguridadVial.findByIdAndUpdate({_id : form[0]._id}, req.body, {new: true});
            res.json({msg: "formSegVial actualizado correctamente"})
        }


        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el formulario');
    }
}

exports.obtenerFormularios = async ( req, res) => {
    try {
        const formularios = await FormularioSeguridadVial.find();
        res.json({ formularios });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el formulario');
    }
}

exports.comprobarFormulario = async ( req, res) => {
    try {

        const { idUsuario } = req.body
        const form = await FormularioSeguridadVial.aggregate([
            {
                $match : { id_usuario: idUsuario }
            }
        ]);
        if(form.length === 0 ){
            return res.json({msg: "Usuario sin formularios"})
        }else{
            return res.status(400).json({msg: 'Existe un cuestionario creado para este usuario' })  
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el formulario');
    }
}