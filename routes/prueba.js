//Rutas para crear pruebas
const express = require('express');
const router = express.Router();
const pruebaController = require('../controllers/pruebaController');
const { check } = require('express-validator');

//Crea un usuario url: api/pruebas
router.post('/',
    pruebaController.crearPrueba
);

router.get('/',
    //Hace falta autenticacion¿?
    pruebaController.obtenerPruebas
)

router.get('/:id',
    //Hace falta autenticacion¿?
    pruebaController.obtenerPruebasPorUsuario
)

router.get('/listarUsuarioEscenario/:id',
    //Hace falta autenticacion¿?
    pruebaController.obtenerPruebasPorUsuarioYEscenario
)

router.get('/imagen/:id',
    pruebaController.obtenerPrueba
)


module.exports = router;