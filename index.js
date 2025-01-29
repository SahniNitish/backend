// write basic express boilerplate code,
//with express.json()middleware

const express = require("express");
const { createTodo } = require("./types");
const app = express();

app.use(express.json());


app.post("/todo" , async function(req ,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }//put it in mongodb
     await todo.create({
        titile: createPayload.titile,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg:"Todo created "
    })

})

app.get("/todos" ,  function(req , res){

    const todos = todo.find({});
    console.log(todos)
    res.json({
        todos
    })

})

app.put("/completed",async function(req ,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
    await todo.update({
        _id: req.body.id
    } ,{
        completed:true
    })
    res.json({
        msg: "Todo marked as completed"
    }
    )
})