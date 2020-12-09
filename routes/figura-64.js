//Rutas para crear formularios figura 64
const express = require('express');
const router = express.Router();
const figura64Controller = require('../controllers/figura64Controller');
const { check } = require('express-validator');

//Crea un usuario url: api/figura64
router.post('/',
    figura64Controller.crearFormulario
);

router.get('/',
    //Hace falta autenticacion¿?
    figura64Controller.obtenerFormularios
) 

router.get('/:id',
    figura64Controller.obtenerFormulariosUsuario
)

router.post('/comprobar',
    figura64Controller.comprobarFormulario
)
module.exports = router;