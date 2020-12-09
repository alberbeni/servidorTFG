const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pruebaSchema = new Schema({
    id_usuario:{ type: String ,required: true},
    escenario:{ type: String ,required: true},
    dispositivo:{ type: String ,required: true},
    anio:{ type: String ,required: true},
    hora:{ type: String ,required: true},
    id_simulacion:{ type: String ,required: true,trim: true},
    consumo_medio:{type: Number,required: true},
    consumo_total:{type: Number,required: true},
    tiempo_total:{type: Number,required: true},
    infracciones:[
        {
        instante: {type: Number,required: true},
        id_infraccion: {type: Number,required: true},
        posicion_x: {type: Number,required: true},
        posicion_y: {type: Number,required: true},
        posicion_z: {type: Number,required: true},
        observaciones: {type: String,required: true},
        nombre: {type: String,required: false}
        }
    ],
    datos:[
        {
        instante: {type: Number,required: true},
        posicion_x: {type: Number,required: true},
        posicion_y: {type: Number,required: true},
        posicion_z: {type: Number,required: true},
        tiempoReaccion: {type: Number,required: true},
        tiempoSiguienteCoche: {type: Number,required: true},
        tiempoSeparacionVehiculos: {type: Number,required: true},
        velocidadVehiculoSiguiente: {type: Number,required: true},
        observaciones: {type: String,required: true},
        }
    ]
});

const Prueba = mongoose.model('Pruebas', pruebaSchema);

module.exports = Prueba;