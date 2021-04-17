
const mongoose=require('mongoose')
const User=require('../models/user')
const Actor=require('../models/actor')
const Category=require('../models/category')

// creation de schema modele movie
const movieSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
        min: 1900,
        max: 2200 
        
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
        //required:true
    },
    actors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Actor'
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'

    }
},{
    timestamps:true
})
/* movieSchema.methods.toJSON= function(){
    const movie=this
    const movieObject=movie.toObject()

    delete movieObject.movies
    
    
    return movieObject
} */
movieSchema.pre('save',async function(next){
    const movie=this
    next()
})
const Movie=mongoose.model('Movie',movieSchema)

module.exports=Movie