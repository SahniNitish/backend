const mongoose = require("mongoose");



mongoose.connect("mongodb+srv://admin:hello@cluster0.pkcgr.mongodb.net/")
const  todoSchema = mongoose.Schema({
    titile: String,
    description: String,
    completed: Boolean

})

const todo = mongoose.model('todos' ,todoSchema);

module.exports = {
    todo
}