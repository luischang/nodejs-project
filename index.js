const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Item = require("./model/Item");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose.connect(process.env.MONGODB_URI).then(()=> {
//     console.log("Conectado a MongoDB");
// }).catch((error)=> {
//     console.error("Error al conectar con MongoDB:" , error);
// });

app.get("/api/sendsms/:number/:message" , (req,res) => {
    const twilio = require('twilio');

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    const number = req.params.number;
    const messagePhoneNumber = req.params.message;

       client.messages.create({
            from: '+17174290831',
            to: '+51' + number,
            body: messagePhoneNumber
        }).then(messageResponse => console.log(messageResponse.sid))
        console.log(messagePhoneNumber);
        res.json("Ok");

});

app.get("/api/sendwapp/:number/:message" , (req,res) => {
    const twilio = require('twilio');

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    const number = req.params.number;
    const messagePhoneNumber = req.params.message;

    async function createMessage(){
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+51' + number,
            body: messagePhoneNumber
        });
        console.log(messagePhoneNumber);
    }
    createMessage();
});

app.post("/api/webhook",express.json(),(req,res)=>{

    console.log("Recibiendo información: "+ req.body.Body);
    res.send("send via callback")

})

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