const Escenario = require('../models/escenario.model');
const Prueba = require('../models/prueba.model');

exports.getEscenarios = async ( req, res) => {
    try {
        const escenarios = await Escenario.find();
        res.json({escenarios});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.crearEscenario = async (req, res) => {
    try {
        const escenario = new Escenario(req.body);
        escenario.save();
        res.json(escenario)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.borrarEscenario = async (req, res) => {
    try {
        await Escenario.findOneAndRemove({ _id: req.params.id})
        res.json({msg: 'Escenario Elmininado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('No existe el escenario');
    }
}

exports.pruebasPorEscenario = async(req, res) => {
    try {
        const escenarios = await Escenario.aggregate([

        ])
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al listar las pruebas por escenario');
    }
}

exports.actualizarEscenario = async (req,res) => {
    try {
        let escenario = await Escenario.findById(req.params.id);

        if(!escenario){
            res.status(500).send('Error al actualizar el escenario'); 
        }
        const nuevoEscenario = {}
        nuevoEscenario.nombre = req.body.nombre
        nuevoEscenario.id_escenario = req.body.id_escenario
        escenario = await Escenario.findByIdAndUpdate({_id : req.params.id}, nuevoEscenario, {new: true})
        res.json({escenario})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el escenario');
    }
}