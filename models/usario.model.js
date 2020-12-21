const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    contrasena: {type: String, required: true},
    email: { type: String, required: true },
    edad: { type: Number, required: true },
    aniosCarnetConducir: { type: Number, required: true },
    jugadorVideojuegos: { type: Boolean, required: true },
    experienciaVideojuegos: { type: Number, required: true },
    experienciaRealidadVirtual: { type: Number, required: true },
    isAdmin: {type: Boolean}, 
    tipoUsuario: {type: String, required: true}
}, {
    timestamps: true,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;