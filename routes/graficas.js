//Rutas para crear pruebas
const express = require('express');
const router = express.Router();
const graficasController = require('../controllers/graficasController');
const { check } = require('express-validator');

router.get('/numEscenarios',
    //Hace falta autenticacion¿?
    graficasController.numEscenarios
)

router.get('/numDispositivos',
    //Hace falta autenticacion¿?
    graficasController.numDispositivos
)

router.get('/tiempoPromedioPorEscenario',
    //Hace falta autenticacion¿?
    graficasController.tiempoPromedioPorEscenario
)

router.get('/tiempoPromedioPorDispositivo',
    //Hace falta autenticacion¿?
    graficasController.tiempoPromedioPorDispositivo
)

router.get('/numInfraccionesPorDispositivo',
    graficasController.numInfraccionesPorDispositivo
)

router.get('/mediaFrom64',
    graficasController.mediaFrom64
)

router.get('/mediaFrom65',
    graficasController.mediaFrom64
)

router.get('/pruebaUsuario/:id',
    graficasController.pruebaUsuario
)

router.get('/numMedioInfraccionesPorDispositivoEscenario',
    graficasController.numMedioInfraccionesPorDispositivoEscenario
)

router.get('/numMedioInfraccionesGrupoPorDispositivoEscenario',
    graficasController.numMedioInfraccionesGrupoPorDispositivoEscenario
)

router.get('/numMedioTodasInfraccionesGrupoPorDispositivoEscenario',
    graficasController.numMedioTodasInfraccionesGrupoPorDispositivoEscenario
)

router.get('/numMedioInfraccionesPorDispositivoEscenarioYUsuario',
    graficasController.numMedioInfraccionesPorDispositivoEscenarioYUsuario
)

router.get('/numMedioTodasInfraccionesPorDispositivoEscenario',
    graficasController.numMedioTodasInfraccionesPorDispositivoEscenario
)

router.get('/mediaFrom64PorEscenarioYDispositivo',
    graficasController.mediaFrom64PorEscenarioYDispositivo
)

router.get('/mediaFrom65PorEscenarioYDispositivo',
    graficasController.mediaFrom65PorEscenarioYDispositivo
)

router.get('/funciona',
    //Hace falta autenticacion¿?
    graficasController.obtenerTiempoMedioPorEscenario
)

module.exports = router;