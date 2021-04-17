const jwt=require('jsonwebtoken')
const User=require('../models/user')
//l'authentification des utilisateurs avec un token stocké dans la base de données

const auth=async (req,res,next)=>{
try{
    //console.log(req.body)
    const token= req.header('Authorization').replace('Bearer ','')
    
    const decoded=jwt.verify(token,'signaturelevelup')
    //console.log(decoded._id)
    const user=await User.findOne({_id:decoded._id,'tokens.token':token})

    if(!user){
        throw new Error()
    }
    req.token=token
    req.user=user
    
    next()
}catch(e){
    res.status(404).send({error:'please authenticate'})
}

}
module.exports=auth