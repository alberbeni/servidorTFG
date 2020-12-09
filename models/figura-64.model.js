const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const figura64Schema = new Schema({
    id_usuario:{ type: String ,required: true},
    escenario:{ type: String ,required: true},
    dispositivo:{ type: String ,required: true},
    /* id_simulacion:{ type: String ,required: true}, */

    jugabilidad:{type: Number, required: true},
    similitudRealidad:{type: Number, required: true},
    utilidadFormacion:{type: Number, required: true},
    experienciaInmersiva:{type: Number, required: true},
    seguimientoMovimientos:{type: Number, required: true},
}, {
    timestamps: true,
});

const Figura64 = mongoose.model('Figura64', figura64Schema);

module.exports = Figura64;