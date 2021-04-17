const mongoose=require('mongoose')
const Movie=require('../models/movie')
//creation de schema modele de category
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
   
})
 
const Category=mongoose.model('Category',categorySchema)
module.exports=Category