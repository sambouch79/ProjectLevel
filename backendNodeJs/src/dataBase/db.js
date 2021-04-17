const mongoose = require('mongoose');
// connection a la base de donnees mongoDb 
mongoose.connect('mongodb://127.0.0.1:27017/LevelUpMovie',
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true ,
    useFindAndModify:false
}).then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err))