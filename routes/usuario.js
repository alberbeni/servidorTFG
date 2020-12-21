//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

//Crea un usuario url: api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('contrasena', 'La contraseña en obligatoria').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('edad', 'La edad es obligatoria').notEmpty(),
        check('aniosCarnetConducir', 'Los años de experiencia conduciendo son esobligatorios').notEmpty(),
        check('jugadorVideojuegos', 'El campo Jugador de videojuegoses obligatorio').notEmpty(),
        check('experienciaVideojuegos', 'La experiencia con videojuegos obligatoria').notEmpty(),
        check('experienciaRealidadVirtual', 'La experiencia con realidad virtual es obligatoria').notEmpty(),
    ],
    usuarioController.crearUsuario
);

router.get('/',
    //Hace falta autenticacion¿?
    usuarioController.getUsuarios
)

router.get('/:id',
    //Hace falta autenticacion¿?
    usuarioController.getUsuario
)

router.delete('/:id',
    usuarioController.deleteUsuario
);

router.post('/editarUsuario',
    //Edición del usuario
    usuarioController.editarUsuario
)

module.exports = router;