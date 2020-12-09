const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const grupoSchema = new Schema({
    nombre: {type: String, required: true},
    edadInicio: { type: Number, required: true },
    edadFin: { type: Number, required: true },
    aniosCarnetConducirInicio: { type: Number, required: true },
    aniosCarnetConducirFin: { type: Number, required: true },
    jugadorVideojuegos: { type: Boolean, required: true },
    experienciaVideojuegosInicio: { type: Number, required: true },
    experienciaVideojuegosFin: { type: Number, required: true },
    experienciaRealidadVirtualInicio: { type: Number, required: true },
    experienciaRealidadVirtualFin: { type: Number, required: true },
}, {
    timestamps: true,
});

const Grupo = mongoose.model('Grupo', grupoSchema);

module.exports = Grupo;