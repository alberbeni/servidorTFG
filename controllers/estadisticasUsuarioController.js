const Infraccion = require('../models/infraccion.model');
const Prueba = require('../models/prueba.model');
const Figura64 = require('../models/figura-64.model');
const Figura65 = require('../models/figura-65.model');

exports.getNumPruebas = async (req, res) => {
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
                    dispositivo: "$dispositivo"
                },
                num_pruebas:{$sum:1}
            }},
            
        ]);
        var datos ={nombre:[], numero:[]} 
        for(let i = 0 ; i< pruebas.length; i++){
            datos.nombre[i] = pruebas[i]._id.escenario + " " + pruebas[i]._id.dispositivo
            datos.numero[i] = pruebas[i].num_pruebas
        }
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getTiempoMedioPruebas = async (req, res) => {
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
                    dispositivo: "$dispositivo"
                },
                tiempo_medio_escenario: {$avg:'$tiempo_total'}
            }},
        ]);
        var datos ={nombre:[], numero:[]} 
        for(let i = 0 ; i< pruebas.length; i++){
            datos.nombre[i] = pruebas[i]._id.escenario + " " + pruebas[i]._id.dispositivo
            datos.numero[i] = pruebas[i].tiempo_medio_escenario
        }
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getPorcentajeInfracciones = async (req, res) => {
    try {
        const id = req.params.id

        const infracciones = await Infraccion.find();

        const pruebas = await Prueba.aggregate([
            {
                $match : { id_usuario: id}
            },
        ]);
        let z = 0;
        for (let i = 0; i < pruebas.length; i++) {
            for(let j = 0; j< pruebas[i].infracciones.length; j++){
                z++
            }
        } 
        var datos ={id_infraccion:[], porcentaje:[], nombre:[]} 
        for(let k = 0 ; k< infracciones.length; k++){
            datos.id_infraccion[k] = infracciones[k].id_infraccion
            datos.porcentaje[k] = 0
            datos.nombre[k] = infracciones[k].nombre
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            for (let i = 0; i < pruebas.length; i++) {
                for(let j = 0; j< pruebas[i].infracciones.length; j++){
                    if(datos.id_infraccion[k] === pruebas[i].infracciones[j].id_infraccion){

                            datos.porcentaje[datos.id_infraccion[k]]++
                        
                    }
                }
            }  
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            datos.porcentaje[k] = ((datos.porcentaje[k]/z)*100).toFixed(2)
        }
        //console.log(datos)
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getPromedioFig65 = async (req, res) => {
    try {
        const id = req.params.id

        const pruebas = await Figura65.aggregate([
            {
                $match : { id_usuario: id}
            },
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo"
                },
                media_malestarGeneral: {$avg: '$malestarGeneral'},
                media_fatiga: {$avg: '$fatiga'},
                media_dolorCabeza: {$avg: '$dolorCabeza'},
                media_fatigaOcular: {$avg: '$fatigaOcular'},
                media_dificultadFijarMirada: {$avg: '$dificultadFijarMirada'},
                media_aumentoSalivacion: {$avg: '$aumentoSalivacion'},
                media_sudor: {$avg: '$sudor'},
                media_nauseas: {$avg: '$nauseas'},
                media_dificultadConcentracion: {$avg: '$dificultadConcentracion'},
                media_pesadezCabeza: {$avg: '$pesadezCabeza'},
                media_visionBorrosa: {$avg: '$visionBorrosa'},
                media_mareoOjosAbiertos: {$avg: '$mareoOjosAbiertos'},
                media_mareoOjosCerrados: {$avg: '$mareoOjosCerrados'},
                media_vertigo: {$avg: '$vertigo'},
                media_malestarEstomago: {$avg: '$malestarEstomago'},
                media_eructos: {$avg: '$eructos'},
                
            }},
            
        ]);

        var datos ={nombre:[], numero:[],
                    media_malestarGeneral:[],
                    media_fatiga:[],
                    media_dolorCabeza:[],
                    media_fatigaOcular:[],
                    media_dificultadFijarMirada:[],
                    media_aumentoSalivacion:[],
                    media_sudor:[],
                    media_nauseas:[],
                    media_dificultadConcentracion:[],
                    media_pesadezCabeza:[],
                    media_visionBorrosa:[],
                    media_mareoOjosAbiertos:[],
                    media_mareoOjosCerrados:[],
                    media_vertigo:[],
                    media_malestarEstomago:[],
                    media_eructos:[],
                    tipo:[  "media_malestarGeneral",
                            "media_fatiga",
                            "media_dolorCabeza",
                            "media_fatigaOcular",
                            "media_dificultadFijarMirada",
                            "media_aumentoSalivacion",
                            "media_sudor",
                            "media_nauseas",
                            "media_dificultadConcentracion",
                            "media_pesadezCabeza",
                            "media_visionBorrosa",
                            "media_mareoOjosAbiertos",
                            "media_mareoOjosCerrados",
                            "media_vertigo",
                            "media_malestarEstomago",
                            "media_eructos"]} 

        for(let i = 0 ; i< pruebas.length; i++){
            datos.nombre[i] = pruebas[i]._id.escenario + " " + pruebas[i]._id.dispositivo
            datos.numero[i] = { media_malestarGeneral: pruebas[i].media_malestarGeneral,
                                media_fatiga: pruebas[i].media_fatiga,
                                media_dolorCabeza: pruebas[i].media_dolorCabeza,
                                media_fatigaOcular: pruebas[i].media_fatigaOcular,
                                media_dificultadFijarMirada: pruebas[i].media_dificultadFijarMirada,
                                media_aumentoSalivacion: pruebas[i].media_aumentoSalivacion,
                                media_sudor: pruebas[i].media_sudor,
                                media_nauseas: pruebas[i].media_nauseas,
                                media_dificultadConcentracion: pruebas[i].media_dificultadConcentracion,
                                media_pesadezCabeza: pruebas[i].media_pesadezCabeza,
                                media_visionBorrosa: pruebas[i].media_visionBorrosa,
                                media_mareoOjosAbiertos: pruebas[i].media_mareoOjosAbiertos,
                                media_mareoOjosCerrados: pruebas[i].media_mareoOjosCerrados,
                                media_vertigo: pruebas[i].media_vertigo,
                                media_malestarEstomago: pruebas[i].media_malestarEstomago,
                                media_eructos: pruebas[i].media_eructos,}
        }
        datos.numero.map((elemento) =>{ 
                                        datos.media_malestarGeneral.push(elemento.media_malestarGeneral),
                                        datos.media_fatiga.push(elemento.media_fatiga),
                                        datos.media_dolorCabeza.push(elemento.media_dolorCabeza),
                                        datos.media_fatigaOcular.push(elemento.media_fatigaOcular),
                                        datos.media_dificultadFijarMirada.push(elemento.media_dificultadFijarMirada),
                                        datos.media_aumentoSalivacion.push(elemento.media_aumentoSalivacion),
                                        datos.media_sudor.push(elemento.media_sudor),
                                        datos.media_nauseas.push(elemento.media_nauseas),
                                        datos.media_dificultadConcentracion.push(elemento.media_dificultadConcentracion),
                                        datos.media_pesadezCabeza.push(elemento.media_pesadezCabeza),
                                        datos.media_visionBorrosa.push(elemento.media_visionBorrosa),
                                        datos.media_mareoOjosAbiertos.push(elemento.media_mareoOjosAbiertos),
                                        datos.media_mareoOjosCerrados.push(elemento.media_mareoOjosCerrados),
                                        datos.media_vertigo.push(elemento.media_vertigo),
                                        datos.media_malestarEstomago.push(elemento.media_malestarEstomago),
                                        datos.media_eructos.push(elemento.media_eructos)})
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getPromedioFig64 = async (req, res) => {
    try {
        const id = req.params.id

        const pruebas = await Figura64.aggregate([
            {
                $match : { id_usuario: id}
            },
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo"
                },
                media_jugabilidad: {$avg:'$jugabilidad'},
                media_similitudRealidad: {$avg:'$similitudRealidad'},
                media_utilidadFormacion: {$avg:'$utilidadFormacion'},
                media_experienciaInmersiva: {$avg:'$experienciaInmersiva'},
                media_seguimientoMovimientos: {$avg:'$seguimientoMovimientos'}
                
            }},
            
        ]);

        var datos ={nombre:[], numero:[],media_jugabilidad:[], media_utilidadFormacion:[],
                    media_similitudRealidad:[], media_experienciaInmersiva:[],
                    media_seguimientoMovimientos:[],
                    tipo:["media_jugabilidad",
                        "media_utilidadFormacion",
                        "media_similitudRealidad",  
                        "media_experienciaInmersiva",
                        "media_seguimientoMovimientos"]} 

        for(let i = 0 ; i< pruebas.length; i++){
            datos.nombre[i] = pruebas[i]._id.escenario + " " + pruebas[i]._id.dispositivo
            datos.numero[i] = { media_jugabilidad: pruebas[i].media_jugabilidad, 
                                media_similitudRealidad: pruebas[i].media_similitudRealidad,
                                media_utilidadFormacion: pruebas[i].media_utilidadFormacion,
                                media_experienciaInmersiva: pruebas[i].media_experienciaInmersiva,
                                media_seguimientoMovimientos: pruebas[i].media_seguimientoMovimientos,}
        }
        datos.numero.map((elemento) =>{datos.media_jugabilidad.push(elemento.media_jugabilidad),
                                        datos.media_similitudRealidad.push(elemento.media_similitudRealidad),
                                        datos.media_utilidadFormacion.push(elemento.media_utilidadFormacion),
                                        datos.media_experienciaInmersiva.push(elemento.media_experienciaInmersiva),
                                        datos.media_seguimientoMovimientos.push(elemento.media_seguimientoMovimientos)})
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getPorcentajeInfraccionesPC = async (req, res) => {
    try {
        const id = req.params.id

        const infracciones = await Infraccion.find();

        const pruebas = await Prueba.aggregate([
            {
                $match : { id_usuario: id,
                            dispositivo: "PC"}
            },
        ]);
        let z = 0;
        for (let i = 0; i < pruebas.length; i++) {
            for(let j = 0; j< pruebas[i].infracciones.length; j++){
                z++
            }
        } 
        var datos ={id_infraccion:[], porcentaje:[], nombre:[]} 
        for(let k = 0 ; k< infracciones.length; k++){
            datos.id_infraccion[k] = infracciones[k].id_infraccion
            datos.porcentaje[k] = 0
            datos.nombre[k] = infracciones[k].nombre
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            for (let i = 0; i < pruebas.length; i++) {
                for(let j = 0; j< pruebas[i].infracciones.length; j++){
                    if(datos.id_infraccion[k] === pruebas[i].infracciones[j].id_infraccion){

                            datos.porcentaje[datos.id_infraccion[k]]++
                        
                    }
                }
            }  
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            datos.porcentaje[k] = ((datos.porcentaje[k]/z)*100).toFixed(2)
        }
        //console.log(datos)
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getPorcentajeInfraccionesOculus = async (req, res) => {
    try {
        const id = req.params.id

        const infracciones = await Infraccion.find();

        const pruebas = await Prueba.aggregate([
            {
                $match : { id_usuario: id,
                            dispositivo: "Oculus Rift"}
            },
        ]);
        let z = 0;
        for (let i = 0; i < pruebas.length; i++) {
            for(let j = 0; j< pruebas[i].infracciones.length; j++){
                z++
            }
        } 
        var datos ={id_infraccion:[], porcentaje:[], nombre:[]} 
        for(let k = 0 ; k< infracciones.length; k++){
            datos.id_infraccion[k] = infracciones[k].id_infraccion
            datos.porcentaje[k] = 0
            datos.nombre[k] = infracciones[k].nombre
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            for (let i = 0; i < pruebas.length; i++) {
                for(let j = 0; j< pruebas[i].infracciones.length; j++){
                    if(datos.id_infraccion[k] === pruebas[i].infracciones[j].id_infraccion){

                            datos.porcentaje[datos.id_infraccion[k]]++
                        
                    }
                }
            }  
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            datos.porcentaje[k] = ((datos.porcentaje[k]/z)*100).toFixed(2)
        }
        //console.log(datos)
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getPorcentajeInfraccionesVR = async (req, res) => {
    try {
        const id = req.params.id

        const infracciones = await Infraccion.find();

        const pruebas = await Prueba.aggregate([
            {
                $match : { id_usuario: id,
                            dispositivo: "VR Box"}
            },
        ]);
        let z = 0;
        for (let i = 0; i < pruebas.length; i++) {
            for(let j = 0; j< pruebas[i].infracciones.length; j++){
                z++
            }
        } 
        var datos ={id_infraccion:[], porcentaje:[], nombre:[]} 
        for(let k = 0 ; k< infracciones.length; k++){
            datos.id_infraccion[k] = infracciones[k].id_infraccion
            datos.porcentaje[k] = 0
            datos.nombre[k] = infracciones[k].nombre
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            for (let i = 0; i < pruebas.length; i++) {
                for(let j = 0; j< pruebas[i].infracciones.length; j++){
                    if(datos.id_infraccion[k] === pruebas[i].infracciones[j].id_infraccion){

                            datos.porcentaje[datos.id_infraccion[k]]++
                        
                    }
                }
            }  
        }
        for(let k = 0 ; k< datos.id_infraccion.length; k++){
            datos.porcentaje[k] = ((datos.porcentaje[k]/z)*100).toFixed(2)
        }
        //console.log(datos)
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getPromedioFig65PorUsuarioEscenarioYDispositivo = async (req, res) => {
    try {
        const { escenario, dispositivo, usuario } = req.query;
        var datos ={infraccion:[], numero:[], infraccionNombre:[]}
        const infracciones = await Infraccion.find();
        
        for(let i = 0; i < infracciones.length; i++){
            datos.infraccion[i] = infracciones[i].id_infraccion
            datos.numero[i] = 0
            datos.infraccionNombre[i] = infracciones[i].nombre
        }
        const pruebas = await Prueba.aggregate([
            {
                $match : { id_usuario: usuario}
            },
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo",
                    infracciones: "$infracciones"
                },                
            }},
            
        ]);

        let numPruebas = 0
        for(let i = 0 ; i< pruebas.length; i++){
            if(pruebas[i]._id.escenario === escenario && pruebas[i]._id.dispositivo === dispositivo
                && pruebas[i]._id.id_usuario === usuario){
                    numPruebas ++
                    //console.log(pruebas[i]._id.infracciones)
                for(let k = 0; k < pruebas[i]._id.infracciones.length; k++){
                    for(let j = 0; j < datos.infraccion.length; j++){
                        if(datos.infraccion[j] == pruebas[i]._id.infracciones[k].id_infraccion){
                            datos.numero[j] = datos.numero[j] + 1;
                        }
                    }

                }
            }
        }
        for(let j = 0; j < datos.infraccion.length; j++){
                datos.numero[j] = datos.numero[j] / numPruebas;
        }
        res.json({datos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}