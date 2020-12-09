const Dispositivo = require('../models/dispositivo.model');

exports.getDispositivos = async ( req, res) => {
    try {
        const dispositivos = await Dispositivo.find();
        res.json({dispositivos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.crearDispositivo = async (req, res) => {
    try {
        const dispositivo = new Dispositivo(req.body);
        dispositivo.save();
        res.json(dispositivo)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.borrarDispositivo = async (req, res) => {
    try {
        await Dispositivo.findOneAndRemove({_id: req.params.id});
        res.json('Dispositivo Eliminado');
    } catch (error) {
        console.log(error);
        res.status(500).send('No existe el dispositivo');
    }
}

exports.actualizarDispositivo = async (req, res) => {
    try {
        let dispositivo = await Dispositivo.findById(req.params.id);

        if(!dispositivo){
            res.status(500).send('No existe el dispositivo');
        }
        const nuevoDispositivo = {}
        nuevoDispositivo.nombre = req.body.nombre

        dispositivo = await Dispositivo.findByIdAndUpdate({_id : req.params.id}, nuevoDispositivo, { new: true })
        res.json({dispositivo})
    } catch (error) {
        console.log(error);
        res.status(500).send('No existe el dispositivo');
    }
}