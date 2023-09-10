const mongoose = require("mongoose");

const DB = "mongodb+srv://shubhampatil:Shubham5538@cluster0.nig2yzc.mongodb.net/taskmanager?retryWrites=true&w=majority"


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("Connetcted To database ")).catch((error)=> console.log(error.message));