const mongoose=require('mongoose')

const actorSchema=new mongoose.Schema({
    firstName:{
            type:String,
            trim:true,
            lowercase:true,
            required:true
            
    },
    lastName:{
        type:String,
        trim:true,
        lowercase:true
    },
    birthdate:{
         type: Date   
    },
    movieActor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie'
    }]
})

const Actor=mongoose.model('Actor',actorSchema)

module.exports=Actor