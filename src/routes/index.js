const express = require('express');
const router = express.Router(); //Este método se encarga de almacenar un objeto, que luego exportaremos

const Task = require('../models/task'); //La constante 'Task' contendrá el esquema de los datos.


router.get('/', async (req,res) =>{
    const tasks = await Task.find();
    console.log(tasks);
    res.render('index', {
        tasks //es lo mismo que tasks:tasks
    });
});

router.post('/add', async (req, res) => { //Gestionamos el formulario; método post y ruta definida al evento
    console.log(req.body); //recibimos los datos del formulario (body para 'post'; query para 'get')
    const task = new Task(req.body); //Con 'new Task' creamos un objeto, con todos los campos/valores, el cual podremos almacenar en la BBDD.
    await task.save(); //Guarda el objeto en la BBDD
    res.redirect('/');

})

router.get('/done/:id', async (req, res)=>{
    const {id} = req.params; //recuperamos el 'id' del objeto request.params
    const task = await Task.findById(id);//Buscamos esta tarea(id) en la BBDD y la guardamos.
    console.log(task); //Observamos que nos devuelve el objeto entero
    task.status = !task.status //Cambiamos el estado de la tarea(true a false o viceversa)
    await task.save(); //Una vez cambiado el estado lo guardamos
    res.redirect('/');

});

router.get('/edit/:id', async (req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit', { //renderizamos el nuevo formulario contenido en 'edit.ejs'
        task             // y le pasamos la tarea encontrada en la BBDD
    });
});

router.post('/edit/:id', async(req,res)=>{
    const {id} = req.params;
    await Task.updateOne({_id:id}, req.body);//Buscará un _id con el valor de la variable'id' y lo reemplazará con el valor del req.body(frontend)
    res.redirect('/');

});

router.get('/delete/:id', async (req, res)=>{
    console.log(req.params.id);
    const {id} = req.params; 
    await Task.remove({_id: id}); //Buscará un _id con el valor de la variable'id' y lo eliminará
    res.redirect('/'); //redireccion a mostrar todos los datos
    
})
module.exports = router; //Exportamos router, estará disponible en cualquier parte del proyecto.

//Hago un cambio en ramaParalela