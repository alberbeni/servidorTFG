const Figura64 = require('../models/figura-64.model');
const { validationResult } = require('express-validator');

exports.crearFormulario = async ( req, res) => {
    try {
        const {id_usuario, escenario, dispositivo} = req.body
        
        const form = await Figura64.aggregate([
            {
                $match : { id_usuario: id_usuario,
                            escenario: escenario,
                            dispositivo: dispositivo}
            }
        ]);
        if(form.length === 0 ){
            //no existen pruebas entonces lo guarda
            const nuevaFigura64 = new Figura64(req.body)
            nuevaFigura64.save()
            res.json({msg: "fig64 añadida correctamente"})
        }else{
            //existen pruebas msg error
            console.log(form[0]._id);
            let formulario = await Figura64.findByIdAndUpdate({_id : form[0]._id}, req.body, {new: true});
            res.json({msg: "fig65 actualizada correctamente"})
        }
        return res.status(400).json({msg: 'Existe un cuestionario creado para este usuario' })
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el formulario');
    }
}

exports.obtenerFormularios = async ( req, res) => {
    try {
        const formularios = await Figura64.find();
        res.json({ formularios });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el formulario');
    }
}

exports.obtenerFormulariosUsuario = async (req, res) => {
    try {
        const formularios = await Figura64.find({ id_usuario: req.params.id });
        res.json({ formularios });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el formulario');
    }
}

exports.comprobarFormulario = async ( req, res) => {
    try {

        const {escenarioAux, dispositivoAux, usuarioAux} = req.body
        console.log(escenarioAux)
        const form = await Figura64.aggregate([
            {
                $match : { id_usuario: usuarioAux,
                            escenario: escenarioAux,
                            dispositivo: dispositivoAux}
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