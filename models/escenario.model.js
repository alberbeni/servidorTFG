const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const escenarioSchema = new Schema({
    nombre: { type: String, required: true },
    id_escenario: { type: Number, required: true }
});

const Escenario = mongoose.model('Escenario', escenarioSchema);

module.exports = Escenario;