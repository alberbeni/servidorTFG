const express = require('express');
const router = express.Router();
const infraccionController = require('../controllers/infraccionController');

router.post('/',
    infraccionController.crearInfraccion
)

router.get('/',
    infraccionController.getInfracciones
)

router.delete('/:id',
    infraccionController.borrarInfraccion
)

router.put('/:id',
    infraccionController.actualizaInfraccion
)
module.exports = router;