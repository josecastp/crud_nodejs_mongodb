const path = require ('path'); //Este módulo nos ayuda con las rutas de los archivos
const express = require ('express');
const morgan = require('morgan');
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

//starting the server
app.listen(app.get('port'), ()=> { //El número de puerto es la variable 'port'
    console.log(`Server on port ${app.get('port')}`);
});