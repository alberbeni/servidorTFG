const Figura65 = require('../models/figura-65.model');
const { validationResult } = require('express-validator');

exports.crearFormulario = async ( req, res) => {
    try {

        const {id_usuario, escenario, dispositivo} = req.body
        const form = await Figura65.aggregate([
            {
                $match : { id_usuario: id_usuario,
                            escenario: escenario,
                            dispositivo: dispositivo}
            }
        ]);
        
        if(form.length === 0 ){
            const nuevaFigura65 = new Figura65(req.body)
            nuevaFigura65.save()
            res.json({msg: "fig65 añadida correctamente"})
        }else{
            console.log(form[0]._id);
            let formulario = await Figura65.findByIdAndUpdate({_id : form[0]._id}, req.body, {new: true});
            res.json({msg: "fig65 actualizada correctamente"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el formulario');
    }
}

exports.obtenerFormularios = async ( req, res) => {
    try {
        const formularios = await Figura65.find();
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
        const form = await Figura65.aggregate([
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