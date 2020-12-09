const Prueba = require('../models/prueba.model')
const Infraccion = require('../models/infraccion.model');

exports.crearPrueba = async ( req, res) => {
    try {
        const prueba = new Prueba(req.body);
        prueba.save();
        res.json(prueba);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPruebas = async ( req, res) => {
    try {
        
        const pruebas = await Prueba.find();
        res.json({pruebas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPruebasPorUsuario = async ( req, res) => {
    try {
        const id = req.params.id
        const pruebas = await Prueba.aggregate([
            {
                $match : { id_usuario: id}
            },
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo",
                    id_prueba: "$_id"
                },
            }},
        ]);
        var datos = [];
        /* for(let i = 0; i<pruebas.length; i++){
            datos[i].id_usuario = pruebas[i]._id.id_usuario
            datos[i].escenario = pruebas[i]._id.escenario
            datos[i].dispositivo = pruebas[i]._id.dispositivo
            datos[i]._id = pruebas[i]._id._id
        } */
        pruebas.map((elemento) =>{ datos.push(elemento._id)})
        res.json(datos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPrueba = async(req, res) => {
    try {
        const idPrueba = req.params.id
        let prueba = await Prueba.findById(idPrueba);
        const infracciones = await Infraccion.find();
        for(let i = 0; prueba.infracciones.length > i ; i++){
            for(let j= 0; infracciones.length > j ; j++){
                if(prueba.infracciones[i].id_infraccion === infracciones[j].id_infraccion){
                    prueba.infracciones[i].nombre = infracciones[j].nombre
                }
            }
        }
        res.json({prueba});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPruebasPorUsuarioYEscenario = async ( req, res) => {
    try {
        const id = req.params.id
        const {escenario} = req.query
        //console.log("opadasfo0hopasdfhfasdoiasdfhjiofasdfasdoif")
        //console.log(escenario + id)

        const pruebas = await Prueba.aggregate([
            {
                $match : { id_usuario: id, escenario: escenario}
            },
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo",
                    id_prueba: "$_id",
                    dia:"$anio",
                    hora:"$hora",
                    tiempo:"$tiempo_total",
                    infracciones:"$infracciones",
                    numInfracciones: "$consumo_total"
                },
            }},
        ]);
        var datos = [];
        
        pruebas.map((elemento) =>{ datos.push(elemento._id)})
        for(let i = 0; i<datos.length; i++){
            datos[i].numInfracciones = datos[i].infracciones.length
        } 
        //datos.map((elemento)=> elemento.infracciones = elemento.infracciones.length())
        //console.log(datos[0].numInfracciones)
        res.json(datos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}