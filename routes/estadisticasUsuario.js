const express = require('express');
const router = express.Router();
const estadisticasUsuarioController = require('../controllers/estadisticasUsuarioController');

router.get('/numPruebas/:id',
    estadisticasUsuarioController.getNumPruebas
)

router.get('/tiempoMedio/:id',
    estadisticasUsuarioController.getTiempoMedioPruebas
)

router.get('/porcentajeInfracciones/:id',
    estadisticasUsuarioController.getPorcentajeInfracciones
)

router.get('/porcentajeInfraccionesPC/:id',
    estadisticasUsuarioController.getPorcentajeInfraccionesPC
)

router.get('/porcentajeInfraccionesOculus/:id',
    estadisticasUsuarioController.getPorcentajeInfraccionesOculus
)

router.get('/porcentajeInfraccionesVR/:id',
    estadisticasUsuarioController.getPorcentajeInfraccionesVR
)

router.get('/promedioFig64/:id',
    estadisticasUsuarioController.getPromedioFig64
)

router.get('/promedioFig65/:id',
    estadisticasUsuarioController.getPromedioFig65
)

router.get('/promedioFig65PorUsuarioEscenarioYDispositivo',
    estadisticasUsuarioController.getPromedioFig65PorUsuarioEscenarioYDispositivo
)

module.exports = router;