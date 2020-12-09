//Rutas para crear formularios figura 65
const express = require('express');
const router = express.Router();
const formularioSeguridadVialController = require('../controllers/formularioSeguridadVialController');
const { check } = require('express-validator');

//Crea un usuario url: api/figura65
router.post('/',
    formularioSeguridadVialController.crearFormulario
);

router.get('/',
    //Hace falta autenticacion¿?
    formularioSeguridadVialController.obtenerFormularios
)

router.post('/comprobar',
    formularioSeguridadVialController.comprobarFormulario
)

module.exports = router;