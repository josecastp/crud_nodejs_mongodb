require('dotenv').config()  // Trata los archivos .env que este en /root como variables globales.
const path = require ('path'); //Este módulo nos ayuda con las rutas de los archivos
const express = require ('express');
const morgan = require('morgan');
const mongoose = require('../database/database'); //Requerimos el archivo de la BBDD

const app = express();


//importing routes
const indexRoutes = require('./routes/index') //montamos el enrutador; requerimos el módulo routes

//settings
app.set ('port', process.env.PORT || 3000); //Definimos un puerto, si no tiene ninguno declarado asume este por defecto (es como una variable)
app.set('views', path.join(__dirname , 'views')); //Informamos al servidor donde tenemos las carpetas de las vistas
app.set('view engine', 'ejs') //Informamos sobre el motor de plantillas(view engine) que utilizaremos.


//middlewares
app.use(morgan('dev'));//Morgan es un middleware, como todos los middlewares, se ejecutará antes de llegar a las rutas. Morgan se utiliza para registrar los detalles de la solicitud (ejemplo -> GET / 404 9.593 ms - 139 => la solicitud ha devuelto un 404; ha tardado 9.593 ms y ha tenido un peso de 139 bytes)

app.use(express.urlencoded({extended:false})); //Gestionar las peticiones post del protocolo http. Este método se encarga de entender, por ejemplo, los datos que nos envían de un formulario html,para entender el formato al almacenar en la BBDD.

//routes
app.use('/', indexRoutes); //Cada vez que un usuario entre a la ruta inicial, utilizará estas rutas(definidas en /routes/index)

// TODO: No tendriamos que empezar a escuchar en el puerto 3000 hasta que no nos hemos conectado a la base de datos.
mongoose.connect(function(){
       app.listen(3000);
    });