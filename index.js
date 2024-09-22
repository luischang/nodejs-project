const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Item = require("./model/Item");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=> {
    console.log("Conectado a MongoDB");
}).catch((error)=> {
    console.error("Error al conectar con MongoDB:" , error);
});

app.get("/api/items", async (req,res) => {

    try
    {
        const items = await Item.find();
        res.json(items);
    }catch(err) {
        res.status(500).json({error: 'Error al consultar la colección'});
    }

});


app.get("/api/esan",(req,res)=>{
    //res.sendStatus(204);    
    res.json("Hola")
});


app.listen(port, () => {
    console.log("Servidor ejecutándose en: http://localhost:" + port)
});