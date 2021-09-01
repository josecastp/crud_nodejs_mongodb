const express = require('express');
const router = express.Router(); //Este método se encarga de almacenar un objeto, que luego exportaremos

const Task = require('../models/task'); //La constante 'Task' contendrá el esquema de los datos.


router.get('/',(req,res) =>{
    res.render('index');
});

router.post('/add', async (req, res) => { //Gestionamos el formulario; método post y ruta definida
    console.log(req.body); //recibimos los datos del formulario (body para 'post'; query para 'get')
    const task = new Task(req.body); //Con 'new Task' creamos un objeto, con todos los campos/valores, el cual podremos almacenar en la BBDD.
    await task.save(); //Guarda el objeto en la BBDD
    
    res.send('recibidos los datos');

})
module.exports = router; //Exportamos router, estará disponible en cualquier parte del proyecto.

//Hago un cambio en ramaParalela