const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const figura65Schema = new Schema({
    id_usuario:{ type: String ,required: true},
    escenario:{ type: String ,required: true},
    dispositivo:{ type: String ,required: true},
    /* id_simulacion:{ type: String ,required: true}, */
    
    malestarGeneral:{type: Number, required: true},
    fatiga:{type: Number, required: true},
    dolorCabeza:{type: Number, required: true},
    fatigaOcular:{type: Number, required: true},
    dificultadFijarMirada:{type: Number, required: true},
    aumentoSalivacion:{type: Number, required: true},
    sudor:{type: Number, required: true},
    nauseas:{type: Number, required: true},
    dificultadConcentracion:{type: Number, required: true},
    pesadezCabeza:{type: Number, required: true},
    visionBorrosa:{type: Number, required: true},
    mareoOjosAbiertos:{type: Number, required: true},
    mareoOjosCerrados:{type: Number, required: true},
    vertigo:{type: Number, required: true},
    malestarEstomago:{type: Number, required: true},
    eructos:{type: Number, required: true},

}, {
    timestamps: true,
});

const Figura65 = mongoose.model('Figura65', figura65Schema);

module.exports = Figura65;