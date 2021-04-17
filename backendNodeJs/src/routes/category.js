const express=require('express')
const Category=require('../models/category')
require('../dataBase/db')
const router=new express.Router()

router.post('/categories',async(req,res)=>{
    const category=new Category(req.body)
    try {
        await category.save()
        res.status(201).send(category)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/categories',async(req,res)=>{
     
    try {
         const categories=await Category.find({})
         if(!categories){
             res.status(404).send({Error: "not found"})
         }
         res.status(200).send(categories)
     } catch (error) {
        res.status(404).send({Error: "not found"})
     }
})
router.get('/categories/:id',async(req,res)=>{
    const _id=req.params.id
    try {
        const category=await Category.findById(_id)
        if(!category){
            res.status(404).send({Error: "not found"})
        }
        res.status(200).send(category)
    } catch (error) {
        res.status(404).send({Error: "not found"})
    }
})
router.patch('/categories/:id',async(req,res)=>{
    const updateFields=Object.keys(req.body)
    const allowedFields=['name']

    const IsValideOp=updateFields.every((update)=> allowedFields.includes(update))

    if(! IsValideOp){
    return res.status(400).send({Error:'invalid update!!!'})
    }
    try {
        const category=await Category.findById(req.params.id)
        if(!category){
            res.status(404).send({Error:"not found"})
        }
        updateFields.forEach((update)=>category[update]=req.body[update])
        await category.save()
        res.status(200).send(category)
    } catch (error) {
        res.status(400).send({Error:"invalid update"})
    } 
})
router.delete('/categories/:id',async(req,res)=>{
    try {
        const category=await Category.findByIdAndDelete(req.params.id)
        res.status(200).send(category)
    } catch (error) {
        res.status.send(error)
    }
})
module.exports=router