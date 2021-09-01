//Creamos el modelo 
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type:Boolean,
        default: false //queremos que el estado de la tarea,por defecto, sea 'false'
    }
});

module.exports = mongoose.model('tasks',TaskSchema); //para cada nueva tarea se almacenará en una colección llamada 'tasks'