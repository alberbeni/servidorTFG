const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true}));

// puerto de la app
const port = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/infraccion', require('./routes/infraccion'));
app.use('/api/escenario', require('./routes/escenario'));
app.use('/api/dispositivo', require('./routes/dispositivo'));
app.use('/api/figura64', require('./routes/figura-64'));
app.use('/api/figura65', require('./routes/figura-65'))
app.use('/api/pruebas', require('./routes/prueba')) 
app.use('/api/formularioSeguridadVial', require('./routes/formularioSeguridadVial')) 
app.use('/api/graficas', require('./routes/graficas')) 
app.use('/api/grupos', require('./routes/grupo')) 
app.use('/api/estadisticasUsuario', require('./routes/estadisticasUsuario'))
app.use('/api/estadisticasEscenario', require('./routes/estadisticasEscenario'))
//app.use('/api/listUsuEscenario', require('./routes/listUsuEscenario'))

// arrancar la app
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});