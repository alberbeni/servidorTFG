const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dispositivoSchema = new Schema({
    nombre: { type: String, required: true },
});

const Dispositivo = mongoose.model('Dispositivo', dispositivoSchema);

module.exports = Dispositivo;