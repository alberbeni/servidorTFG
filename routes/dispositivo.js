const express = require('express');
const router = express.Router();
const dispositivoController = require('../controllers/dispositivoController');

router.post('/',
    dispositivoController.crearDispositivo
)

router.get('/',
    dispositivoController.getDispositivos
)

router.delete('/:id',
    dispositivoController.borrarDispositivo
)

router.put('/:id',
    dispositivoController.actualizarDispositivo
)
module.exports = router;