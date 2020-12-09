const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formularioSeguridadVialSchema = new Schema({
    id_usuario:{ type: String ,required: true},
    /* escenario:{ type: String ,required: true},
    dispositivo:{ type: String ,required: true}, */
    /* id_simulacion:{ type: String ,required: true}, */
    form1:{ type: String ,required: true},
    form2a:{ type: String ,required: true},
    form2b:{ type: String ,required: true},
    form2c:{ type: String ,required: true},
    form2d:{ type: String ,required: true},
    form2e:{ type: String ,required: true},
    form2f:{ type: String ,required: true},
    form3a:{ type: String ,required: true},
    form3b:{ type: String ,required: true},
    form3c:{ type: String ,required: true},
    form3d:{ type: String ,required: true},
    form3e:{ type: String ,required: true},
    form3f:{ type: String ,required: true},
    form4a:{ type: String ,required: true},
    form4b:{ type: String ,required: true},
    form4c:{ type: String ,required: true},
    form5a:{ type: String ,required: true},
    form5b:{ type: String ,required: true},
    form5c:{ type: String ,required: true},
    form5d:{ type: String ,required: true},
    form5e:{ type: String ,required: true},
    form6a:{ type: String ,required: true},
    form6b:{ type: String ,required: true},
    form7a:{ type: String ,required: true},
    form7b:{ type: String ,required: true},
    form7c:{ type: String ,required: true},
    form7d:{ type: String ,required: true},
    form7e:{ type: String ,required: true},
    form8:{ type: String ,required: true},
    form9a:{ type: String ,required: true},
    form9b:{ type: String ,required: true},
    form9c:{ type: String ,required: true},
    form9d:{ type: String ,required: true},
    form9e:{ type: String ,required: true},
    form9f:{ type: String ,required: true},
    form10a:{ type: String ,required: true},
    form10b:{ type: String ,required: true},
    form10c:{ type: String ,required: true},
    form10d:{ type: String ,required: true},
    form10e:{ type: String ,required: true},
    form10f:{ type: String ,required: true},
    form10g:{ type: String ,required: true},
    form11a:{ type: String ,required: true},
    form11b:{ type: String ,required: true},
    form11c:{ type: String ,required: true},
    form11d:{ type: String ,required: true},
    form11e:{ type: String ,required: true},
    form11f:{ type: String ,required: true},
    form12a:{ type: String ,required: true},
    form12b:{ type: String ,required: true},
    form12c:{ type: String ,required: true},
    form12d:{ type: String ,required: true},
    form12e:{ type: String ,required: true},
    form12f:{ type: String ,required: true},
    form13:{ type: String ,required: true},
    form14:{ type: String ,required: true},
    form15:[
        {
            vehiculo:{ type: String ,required: true},
        }
    ],
    form16:{ type: String ,required: true},

}, {
    timestamps: true,
});

const FormularioSeguridadVial = mongoose.model('FormularioSeguridadVial', formularioSeguridadVialSchema);

module.exports = FormularioSeguridadVial;