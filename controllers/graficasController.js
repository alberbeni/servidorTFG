const Prueba = require('../models/prueba.model')
const Figura64 = require('../models/figura-64.model');
const Figura65 = require('../models/figura-65.model');
const Usuario = require('../models/usario.model')

exports.numEscenarios = async ( req, res) => {
    try {
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:"$escenario",
                num_escenarios:          
                {$sum:1}
            }}
        ]);
        res.json({pruebas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.numDispositivos = async ( req, res) => {
    try {
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:"$dispositivo",
                num_dispositivos:{$sum:1}
            }}
        ]);
        res.json({pruebas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.tiempoPromedioPorEscenario = async ( req, res) => {
    try {
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:"$escenario",
                tiempo_medio_escenario:          
                {$avg:'$tiempo_total'}
            }}
        ]);
        res.json({pruebas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.tiempoPromedioPorDispositivo = async ( req, res) => {
    try {
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:"$dispositivo",
                tiempo_medio_dispositivo:          
                {$avg:'$tiempo_total'}
            }}
        ]);
        res.json({pruebas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.numInfraccionesPorDispositivo = async ( req, res) => {
    try {
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:"$dispositivo",
                num_infracciones:{$addToSet:'$infracciones'}
            }}
        ]);
        var datos ={nombre:[], numero:[]} 
        for (let i = 0; i < pruebas.length; i++) {
            datos.nombre = [...datos.nombre, pruebas[i]._id]
            datos.numero = [...datos.numero, pruebas[i].num_infracciones[0].length];
        } 
        res.json({datos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.mediaFrom64 = async ( req, res) => {
    try {
        const datosFormulario64 = await Figura64.aggregate([
            {$group: {
                _id:"$dispositivo",
                jugabilidad:{$avg:'$jugabilidad'},
                similitudRealidad:{$avg:'$similitudRealidad'},
                utilidadFormacion:{$avg:'$utilidadFormacion'},
                experienciaInmersiva:{$avg: '$experienciaInmersiva'},
                seguimientoMovimientos:{$avg:'$seguimientoMovimientos'},
            }}
        ]);
        res.json({datosFormulario64});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.mediaFrom65 = async ( req, res) => {
    try {
        const datosFormulario64 = await Figura65.aggregate([
            {$group: {
                _id:"$dispositivo",
                malestarGeneral:{$avg:'malestarGeneral'},
                fatiga:{$avg:'fatiga'},
                dolorCabeza:{$avg:'dolorCabeza'},
                fatigaOcular:{$avg:'fatigaOcular'},
                dificultadFijarMirada:{$avg:'dificultadFijarMirada'},
                aumentoSalivacion:{$avg:'aumentoSalivacion'},
                sudor:{$avg:'sudor'},
                nauseas:{$avg:'nauseas'},
                dificultadConcentracion:{$avg:'dificultadConcentracion'},
                pesadezCabeza:{$avg:'pesadezCabeza'},
                visionBorrosa:{$avg:'visionBorrosa'},
                mareoOjosAbiertos:{$avg:'mareoOjosAbiertos'},
                mareoOjosCerrados:{$avg:'mareoOjosCerrados'},
                vertigo:{$avg:'vertigo'},
                malestarEstomago:{$avg:'malestarEstomago'},
                eructos:{$avg:'eructos'},
            }}
        ]);
        res.json({datosFormulario64});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.pruebaUsuario = async (req, res) => {
    try {
        const { escenario } = req.query;
        const pruebas = await Prueba.find({ escenario })
        let pruebasUsuario = [];
        for(let i = 0; i< pruebas.length ; i++){
            if(pruebas[i].id_usuario === req.params.id){
                pruebasUsuario = [...pruebasUsuario, pruebas[i]]
            }
        }
        res.json({pruebasUsuario});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.numMedioInfraccionesPorDispositivoEscenario = async (req, res) => {
    try {
        const { escenario, dispositivo, infraccion } = req.query;
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo"
                },
                num_infracciones:{$push:'$infracciones'},
                num_pruebas:{$sum:1}
            }}
        ]);
        var datos ={usuario:[], mediaInfracciones:[]} 
        for (let i = 0; i < pruebas.length; i++) {
            if(pruebas[i]._id.escenario === escenario && pruebas[i]._id.dispositivo === dispositivo){
                let numInfracciones = 0
                for(let j = 0; j < pruebas[i].num_infracciones.length; j++){
                    for(let k = 0; k < pruebas[i].num_infracciones[j].length ; k++){
                        if(pruebas[i].num_infracciones[j][k].id_infraccion == infraccion){
                            numInfracciones++
                        }
                    }
                }
                let mediaInfraccionesPrueba = 0
                if(numInfracciones !== 0){
                    mediaInfraccionesPrueba = numInfracciones / pruebas[i].num_pruebas
                }
                datos.usuario = [...datos.usuario, pruebas[i]._id.id_usuario]
                datos.mediaInfracciones = [...datos.mediaInfracciones, mediaInfraccionesPrueba];
            }
            
        } 
        for(let i= 0 ; i < datos.usuario.length  ; i++){
            const usuAux = await Usuario.findById(datos.usuario[i]);
            datos.usuario[i] = usuAux.nombre
        }
        res.json({datos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.numMedioInfraccionesPorDispositivoEscenarioYUsuario = async (req, res) => {
    try {
        const { escenario, dispositivo, infraccion, usuario } = req.query;
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo"
                },
                num_infracciones:{$push:'$infracciones'},
                num_pruebas:{$sum:1}
            }}
        ]);
        var datos ={usuario:[], mediaInfracciones:[]} 
        for (let i = 0; i < pruebas.length; i++) {
            if(pruebas[i]._id.escenario === escenario && pruebas[i]._id.dispositivo === dispositivo
                && pruebas[i]._id.id_usuario === usuario){
                let numInfracciones = 0
                for(let j = 0; j < pruebas[i].num_infracciones.length; j++){
                    for(let k = 0; k < pruebas[i].num_infracciones[j].length ; k++){
                        if(pruebas[i].num_infracciones[j][k].id_infraccion == infraccion){
                            numInfracciones++
                        }
                    }
                }
                let mediaInfraccionesPrueba = 0
                if(numInfracciones !== 0){
                    mediaInfraccionesPrueba = numInfracciones / pruebas[i].num_pruebas
                }
                datos.usuario = [...datos.usuario, pruebas[i]._id.id_usuario]
                datos.mediaInfracciones = [...datos.mediaInfracciones, mediaInfraccionesPrueba];
            }
            
        } 
        res.json({datos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.numMedioInfraccionesGrupoPorDispositivoEscenario = async (req, res) => {
    try {
        const { escenario, dispositivo, infraccion, nombre, edadInicio, edadFin, aniosCarnetConducirInicio, 
            aniosCarnetConducirFin, jugadorVideojuegos, experienciaVideojuegosInicio, experienciaVideojuegosFin, 
            experienciaRealidadVirtualInicio, experienciaRealidadVirtualFin} = req.query;
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:{
                    escenario : "$escenario",
                    dispositivo: "$dispositivo"
                },
                num_infracciones:{$push:'$infracciones'},
                num_pruebas:{$sum:1},
                id_usuario:{$push:'$id_usuario'}
            }}
        ]);
        //console.log(experienciaVideojuegosInicio + " " +experienciaVideojuegosFin)
        const usuarios = await Usuario.find({ 
            jugadorVideojuegos : jugadorVideojuegos,
            edad : { $gte: edadInicio, $lte: edadFin},
            aniosCarnetConducir : { $gte: aniosCarnetConducirInicio, $lte: aniosCarnetConducirFin},
            experienciaRealidadVirtual : { $gte: experienciaRealidadVirtualInicio, $lte: experienciaRealidadVirtualFin},
            experienciaVideojuegos : { $gte: experienciaVideojuegosInicio, $lte: experienciaVideojuegosFin}
        
        })
        //console.log(pruebas)
        //console.log(usuarios) 
        var datos ={usuario:[], mediaInfracciones:[]} 
        var numpruebas = 0;
        var infracciones = 0;
        for (let i = 0; i < pruebas.length; i++) {
            for(let k = 0; k<usuarios.length; k++){
                if(pruebas[i]._id.escenario === escenario && pruebas[i]._id.dispositivo === dispositivo ){
                    for(let w = 0; w < pruebas[i].id_usuario.length; w++){
                        //console.log(usuarios[k]._id + " eing " + pruebas[i].id_usuario[w] + " pintaa")
                        if(pruebas[i].id_usuario[w] == usuarios[k]._id){
                            //console.log("entra")
                            let numInfracciones = 0
                            numpruebas++;
                            /* for(let j = 0; j < pruebas[i].num_infracciones.length; j++){ */
                                for(let k = 0; k < pruebas[i].num_infracciones[w].length ; k++){
                                    if(pruebas[i].num_infracciones[w][k].id_infraccion == infraccion){
                                        numInfracciones++
                                        infracciones++;
                                    }
                                }
                            /* } */
                            let mediaInfraccionesPrueba = 0
                            if(numInfracciones !== 0){
                                mediaInfraccionesPrueba = numInfracciones / pruebas[i].num_pruebas
                            }
                            datos.usuario = [...datos.usuario, pruebas[i].id_usuario]
                            datos.mediaInfracciones = [...datos.mediaInfracciones, mediaInfraccionesPrueba];
                        }
                    }
                }
            }
            
        } 

        const porcentaje = [] 
        porcentaje[0] = (infracciones / numpruebas)
        res.json(porcentaje);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.numMedioTodasInfraccionesPorDispositivoEscenario = async (req, res) => {
    try {
        const { escenario, dispositivo, infraccion } = req.query;
        const pruebas = await Prueba.aggregate([
            {$group: {
                _id:{
                    id_usuario : "$id_usuario",
                    escenario : "$escenario",
                    dispositivo: "$dispositivo"
                },
                num_infracciones:{$push:'$infracciones'},
                num_pruebas:{$sum:1}
            }}
        ]);
        var datos ={usuario:[], mediaInfracciones:[]} 
        for (let i = 0; i < pruebas.length; i++) {
            if(pruebas[i]._id.escenario === escenario && pruebas[i]._id.dispositivo === dispositivo){
                let numInfracciones = 0
                for(let j = 0; j < pruebas[i].num_infracciones.length; j++){
                    for(let k = 0; k < pruebas[i].num_infracciones[j].length ; k++){
                        if(pruebas[i].num_infracciones[j][k].id_infraccion == infraccion){
                            numInfracciones++
                        }
                    }
                }
                let mediaInfraccionesPrueba = 0
                if(numInfracciones !== 0){
                    mediaInfraccionesPrueba = numInfracciones / pruebas[i].num_pruebas
                }
                datos.usuario = [...datos.usuario, pruebas[i]._id.id_usuario]
                datos.mediaInfracciones = [...datos.mediaInfracciones, mediaInfraccionesPrueba];
            }
            
        } 
        res.json({datos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.mediaFrom64PorEscenarioYDispositivo = async ( req, res) => {
    try {
        const { escenario, dispositivo } = req.query;
        const datosFormulario64 = await Figura64.aggregate([
            {
                $match : { escenario: escenario, dispositivo: dispositivo}
            },{$group: {
                _id:"$id_usuario",
                jugabilidad:{$avg:'$jugabilidad'},
                similitudRealidad:{$avg:'$similitudRealidad'},
                utilidadFormacion:{$avg:'$utilidadFormacion'},
                experienciaInmersiva:{$avg: '$experienciaInmersiva'},
                seguimientoMovimientos:{$avg:'$seguimientoMovimientos'},
            }}
        ]);
        res.json({datosFormulario64});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.mediaFrom65PorEscenarioYDispositivo = async ( req, res) => {
    try {
        const { escenario, dispositivo } = req.query;
        const datosFormulario64 = await Figura65.aggregate([
            {
                $match : { escenario: escenario, dispositivo: dispositivo}
            },{$group: {
                _id:"$id_usuario",
                malestarGeneral:{$avg:'malestarGeneral'},
                fatiga:{$avg:'fatiga'},
                dolorCabeza:{$avg:'dolorCabeza'},
                fatigaOcular:{$avg:'fatigaOcular'},
                dificultadFijarMirada:{$avg:'dificultadFijarMirada'},
                aumentoSalivacion:{$avg:'aumentoSalivacion'},
                sudor:{$avg:'sudor'},
                nauseas:{$avg:'nauseas'},
                dificultadConcentracion:{$avg:'dificultadConcentracion'},
                pesadezCabeza:{$avg:'pesadezCabeza'},
                visionBorrosa:{$avg:'visionBorrosa'},
                mareoOjosAbiertos:{$avg:'mareoOjosAbiertos'},
                mareoOjosCerrados:{$avg:'mareoOjosCerrados'},
                vertigo:{$avg:'vertigo'},
                malestarEstomago:{$avg:'malestarEstomago'},
                eructos:{$avg:'eructos'},
            }}
        ]);
        res.json({datosFormulario64});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerTiempoMedioPorEscenario = async ( req, res) => {
    try {
        console.log("aquiii")
        const escenario = "Escenario 2"
        console.log(escenario)
        
        const pruebas = await Prueba.aggregate([
            {
                $match : { escenario: escenario}
            },
            {$group: {
                _id:"$escenario",
                tiempoMedio: {$avg:'$tiempo_total'}
            }},
        ]);
       
       console.log(pruebas)
        res.json(pruebas)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}