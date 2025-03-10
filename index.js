import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import { Viaje } from './models/Viaje.js';
import { GuiaTuristico } from './models/GuiaTuristico.js';
import { Hotel } from './models/Hotel.js';

const app = express();

// Conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => {
        console.error('Error al conectar la base de datos:', error);
    });

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`El servidor está funcionando en el puerto ${port}`);
    });

// Establecer motor de vistas
app.set('view engine', 'pug');

// Middleware
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombrepagina = 'Agencia de Viajes';
    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto https://gs-agb6.onrender.com:${port}`);
});
