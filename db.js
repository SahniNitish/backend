const mongoose = require("mongoose");



mongoose.connect("**********")
const  todoSchema = mongoose.Schema({
    titile: String,
    description: String,
    completed: Boolean

})

const todo = mongoose.model('todos' ,todoSchema);

module.exports = {
    todo
}
