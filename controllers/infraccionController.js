const Infraccion = require('../models/infraccion.model');

exports.getInfracciones = async ( req, res) => {
    try {
        const infracciones = await Infraccion.find();
        res.json({infracciones});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.crearInfraccion = async (req, res) => {
    try {
        const infraccion = new Infraccion(req.body);
        infraccion.save();
        res.json(infraccion)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.borrarInfraccion = async (req, res) => {
    try {
        await Infraccion.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'})
    } catch (error) {
        res.status(404).json({msg : 'No existe la infracción'})
    }
}

exports.actualizaInfraccion = async (req, res) => {
    try {
        let infraccion = await Infraccion.findById(req.params.id);

        if(!infraccion){
            return res.status(404).json({msg : 'Fallo en la edición de una infracción'})
        }

        const nuevaInfraccion = {}
        nuevaInfraccion.nombre = req.body.nombre;
        nuevaInfraccion.id_infraccion = req.body.id_infraccion;
        infraccion = await Infraccion.findByIdAndUpdate({_id : req.params.id}, nuevaInfraccion, { new: true });
        res.json({infraccion})

    } catch (error) {
        res.status(404).json({msg : 'Fallo en la edición de una infracción'})
    }
}