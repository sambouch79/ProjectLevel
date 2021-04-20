const mongoose = require('mongoose');
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//creation de schema user
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }

    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:8,
        validate(value){
            if(value.toLowerCase().includes('password')||value.toLowerCase().includes('000000')){
                throw new Error('invalid password') 
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
 userSchema.virtual('movies',{
    ref:'Movie',
    localField:'_id',
    foreignField:'owner'
}) 

userSchema.methods.toJSON= function(){
    const user=this
    const userObject=user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
} 
//methode pour generer le token
userSchema.methods.generateAuthToken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'signaturelevelup')
    user.tokens=user.tokens.concat({token:token})
    await user.save()
    return token
}
//methode pour rechercher un utilisateur via mot de pass et email avec bcrypt
userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }
    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}
//le hashage de password avec bcrypt
userSchema.pre('save', async function(next){
    const user=this
    if (user.isModified('password')) {
      user.password=await bcrypt.hash(user.password,8) 
    }    
next()
})

const User=mongoose.model('User',userSchema)

module.exports=User