//Rutas para crear grupos
const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

router.post('/',
    grupoController.crearGrupo
);
 
router.get('/',
    grupoController.listarGrupos
)

router.delete('/:id',
    grupoController.borrarGrupo
)

router.put('/:id',
    grupoController.actualizarGrupo
)

module.exports = router