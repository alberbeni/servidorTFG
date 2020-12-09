const Grupo = require('../models/grupo.model');


exports.crearGrupo = async( req,res) => {
    try {
        const nuevoGrupo = new Grupo(req.body)
        nuevoGrupo.save()
        res.json({msg: "grupo añadido correctamente"})
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el grupo');
    }
}

exports.listarGrupos = async ( req, res) => {
    try {
        const grupos = await Grupo.find();
        res.json({grupos})
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el grupo');
    }
}

exports.borrarGrupo = async ( req, res) => {
    try {
        await Grupo.findOneAndRemove({ _id: req.params.id})
        res.json({ msg: "Grupo borrado correctamente"})
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el grupo');
    }
}

exports.actualizarGrupo = async (req,res) => {
    try {
        let grupo = await Grupo.findById(req.params.id);

        if(!grupo){
            res.status(500).send('Error al actualizar el grupo'); 
        }
        let nuevoGrupo = {}
        nuevoGrupo = req.body
        delete nuevoGrupo._id
        grupo = await Grupo.findByIdAndUpdate({_id : req.params.id}, nuevoGrupo, {new: true})
        res.json({grupo})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el grupo');
    }
}