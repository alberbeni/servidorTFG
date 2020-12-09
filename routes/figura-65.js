//Rutas para crear formularios figura 65
const express = require('express');
const router = express.Router();
const figura65Controller = require('../controllers/figura65Controller');
const { check } = require('express-validator');

//Crea un usuario url: api/figura65
router.post('/',
    figura65Controller.crearFormulario
);

router.get('/',
    //Hace falta autenticacion¿?
    figura65Controller.obtenerFormularios
)

router.post('/comprobar',
    figura65Controller.comprobarFormulario
)

module.exports = router;