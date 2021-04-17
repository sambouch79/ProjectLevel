const express=require('express')
const Actor=require('../models/actor')
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
    const updateFields=Object.keys(req.body)
    const allowedFields=['firstName','lastName','birthdate']

    const IsValideOp=updateFields.every((update)=> allowedFields.includes(update))

    if(! IsValideOp){
    return res.status(400).send({Error:'invalid update!!!'})
    }
    try {
        const actor=await Actor.findById(req.params.id)
        if(!actor){
            res.status(404).send({Error:"not found"})
        }
        updateFields.forEach((update)=>actor[update]=req.body[update])
        await actor.save()
        res.status(200).send(actor)
    } catch (error) {
        res.status(400).send({Error:"not found"})
    }
    
})
//effacer un acteur via son id
router.delete('/actors/:id',async(req,res)=>{
    try {
        const actor=await Actor.findByIdAndDelete(req.params.id)
        res.status(200).send(actor)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports=router