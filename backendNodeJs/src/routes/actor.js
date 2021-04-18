const express=require('express')
const Actor=require('../models/actor')
const Movie = require('../models/movie')
require('../dataBase/db')
const router=new express.Router()

//creer un nouveau acteur 
router.post('/actors',async(req,res)=>{
        const actor=new Actor(req.body);
        try {
           
            await actor.save()
            res.status(201).send(actor)
        } catch (error) {
           res.send(400).send(error)
        }
})
//afficher tous les acteurs
router.get('/actors',async(req,res)=>{
    try {
        const actors= await Actor.find({})
        
        if(!actors){
            res.status(404).send({Error: "not found"})
        }
        
        res.status(200).send(actors)
        
    } catch (error) {
        res.status(400).send(error)
    }
})
//chercher un acteur via son id 
router.get('/actors/:id',async(req,res)=>{
    try {
        const actor= await Actor.findById(req.params.id)
        
        if(!actor){
            res.status(404).send({Error: "not found"})
        }
        
        res.status(200).send(actor)
    } catch (error) {
        res.status(400).send({Error: "not found"})
    }
    
})
//mettre à jour un acteur via son id
router.patch('/actors/:id',async(req,res)=>{
    const actor=req.body
    const updateFields=Object.keys(actor)
    const allowedFields=['firstName','lastName','birthdate','movieActor']
    const newMovies = actor.movieActor || [];
    const IsValideOp=updateFields.every((update)=> allowedFields.includes(update))

    if(! IsValideOp){
    return res.status(400).send({Error:'invalid update!!!'})
    }
    try {
        const oldActor=await Actor.findById(req.params.id)
        if(!actor){
            res.status(404).send({Error:"not found"})
        }
        const oldMovies=oldActor.movieActor;
         
         Object.assign(oldActor, actor);
      
        const newActor= await oldActor.save();
        
        
        const added = difference(newMovies, oldMovies); 
        const removed = difference(oldMovies, newMovies);

          //sauvegarde des nouveaux movies
          await Movie.updateMany({ _id: added }, { $addToSet: { actors: newMovie._id } });
        
          //suppression des movies supprimes
          await Movie.updateMany({ _id: removed }, { $pull: { actors: newMovie._id } });
        
        res.status(200).send(newActor)
    } catch (error) {
        res.status(400).send({Error:"not found"})
    }
    
})
//effacer un acteur via son id
router.delete('/actors/:id',async(req,res)=>{
    try {
        const actor=await Actor.findById(req.params.id)
        if(!actor){
            return res.status(400).send({error:'Not found'})
        }
        console.log(actor)
        await actor.remove()
        console.log(actor.movieActor)
        if(actor.movieActor===[]){
            console.log(true)
            return res.status(200).send({message:'actor have not movie'})
        }
        await Movie.updateMany({ _id: actor.movieActor }, { $pull: { actors: actor._id } });
        
        res.status(200).send(actor)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports=router