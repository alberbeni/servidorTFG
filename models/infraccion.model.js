const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infraccionSchema = new Schema({
    nombre: { type: String, required: true },
    id_infraccion: { type: Number, required: true },
});

const Infraccion = mongoose.model('Infracciones', infraccionSchema);

module.exports = Infraccion;