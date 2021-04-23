const express=require('express')
const Movie=require('../models/movie')
const auth=require('../middleware/auth')
const Category=require('../models/category')
const Actor=require('../models/actor')
const difference=require('../util/difference')
require('../dataBase/db')
const router=new express.Router()

//creer un movie 
router.post('/movies',auth,async(req,res)=>{
    const movie=new Movie({
        ...req.body,
        'owner':req.user._id ,
        
    })
    try {
            
             const savedMovie=await movie.save()
          
            await Actor.updateMany({ _id: movie.actors }, { $push: { movieActor: savedMovie._id } });
            
           
        res.status(201).send(savedMovie)
    } catch (error) {
        res.status(400).send(error)
    }
})
// rechercher un movie via son id
router.get('/movies/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try {
        const movie=await Movie.findOne({_id,owner:req.user._id})
        await movie.populate('category').execPopulate()
       
        if(!movie){
            return res.status(404).send(error)
        }
        
        res.status(200).send(movie)
    } catch (error) {
       res.status(500).send(error) 
    }
})
//afficher la liste de tous les movies 
router.get('/movies',auth,async(req,res)=>{
    
    const sort={}
    if(req.query.sortBy){
       const parts=req.query.sortBy.split('_')
        console.log(parts)
        sort[parts[0]]=parts[1]==='desc'?-1:1
    } 
 
    try {
       
       await req.user.populate({
           path:'movies',
           options:{
               limit:parseInt(req.query.limit),
               skip:parseInt(req.query.skip),
               sort
           }, populate: { path: 'category' }
       }).execPopulate()
        
        res.status(200).send(req.user.movies)
    } catch (error) {
        res.status(500).send(error)  
    }

})
//mettre a jour un movie via son id
router.patch('/movies/:id',auth,async(req,res)=>{
    const movie=req.body
    const updateFields=Object.keys(movie)
    //liste des proprietes que l'on peut modifier
    const allowedFields=['title','year','category','actors']
   
    const newActors = movie.actors || [];
    
    //--controler les proprietes a modifier
    const IsValideOp=updateFields.every((update)=> allowedFields.includes(update))
    if(! IsValideOp){
        return res.status(400).send({Error:'invalid updates!!!'})
    }
  
    try {
        const oldMovie=await Movie.findOne({_id:req.params.id,owner:req.user._id})
        
         if(!oldMovie){
             return res.status(404).send({Error:'invalid updates!!!'})
         }
    
         const oldActors=oldMovie.actors;
         
         Object.assign(oldMovie, movie);
         
         const newMovie = await oldMovie.save();
        //console.log(newMovie)
        
        const added = difference(newActors, oldActors); // retourne les id  actor de newActor qui ne sont pas dans oldActors 
        const removed = difference(oldActors, newActors); // retourne les id  actor de oldActor qui ne sont pas dans newActors
        
        //---sauvegarde des nouveaux actors-----
        await Actor.updateMany({ _id: added }, { $addToSet: { movieActor: newMovie._id } });
        
        //--suppression des actors supprimes-----
        await Actor.updateMany({ _id: removed }, { $pull: { movieActor: newMovie._id } });
        //console.log(newMovie)
        
        res.send(newMovie)
     } catch (error) {
         res.status(400).send(error)
     }
      
})
//supprimer un movie via son id
router.delete('/movies/:id',auth,async(req,res)=>{
    try {
        const movie=await Movie.findOne({_id:req.params.id,owner:req.user._id})

        if(!movie){
            return res.status(400).send({error:'movie not found'})
        }
        movie.remove()
        
        await Actor.updateMany({ '_id': movie.actors }, { $pull: { movieActor: movie._id } });
        res.send(movie)
    } catch (e) {
         res.status(400).send(e)
    }
})
module.exports=router