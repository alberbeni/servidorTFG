const express = require('express');
const router = express.Router();
const escenarioController = require('../controllers/escenarioController');
const { removeListener } = require('../models/escenario.model');

router.post('/',
    escenarioController.crearEscenario
)

router.get('/',
    escenarioController.getEscenarios
)

router.delete('/:id',
    escenarioController.borrarEscenario
)

router.get('/count',
    escenarioController.pruebasPorEscenario
)

router.put('/:id',
    escenarioController.actualizarEscenario
)
module.exports = router;