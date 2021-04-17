const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
require('../dataBase/db')
const router=new express.Router()

//creation un nouveau compte utilisateur
router.post('/users',async(req,res)=>{
    const user=new User(req.body)
     try {
         await user.save()
         const token=await user.generateAuthToken()
         res.status(201).send({user,token})
     } catch (error) {
         res.status(400).send(error)
     }
})
//login avec auth
router.post('/users/login',auth,async(req,res)=>{
    
    try {
        console.log(req.body)
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send('please authenticate')
    }
})
//logout apres auth
router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter(token=>{
                return token.token!==req.token
            } )
        await req.user.save()
        res.send('you logout correctly')
     } catch (error) {
         res.status(500).send(error)
     }
})
//afficher les infos de l'utilisateur connecte
router.get('/users/me',auth,async(req,res)=>{
    res.status(200).send(req.user)
})
//mettre a jour les information de l'utilsateur apres auth
router.patch('/users/me',auth,async(req,res)=>{
    const fieldToUpdate=Object.keys(req.body)
    const allowedField=['email','password']
    const isValideField=fieldToUpdate.every((update)=>allowedField.includes(update))

    if(!isValideField){
        res.status(400).send({error:'update is not allowed'})
    }
    try {
        fieldToUpdate.forEach(update => req.user[update]=req.body[update]);
        await req.user.save()
        res.status(200).send(req.user)
   } catch (error) {
       res.status(400).send(error)
   } 
})
//supprimer un compte utilisateur apres auth
router.delete('/users/me',auth,async(req,res)=>{
    try {
        const user=req.user
        user.remove()
       res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router