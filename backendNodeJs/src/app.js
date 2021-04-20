const express=require('express')
const userRouter=require('./routes/user')
const movieRouter=require('./routes/movie')
const categoryRouter=require('./routes/category')
const actorRouter=require('./routes/actor')
const cors=require('cors')
const app=express()
const port=process.env.PORT||3000
app.use( (req, res, next)=> {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization');
    next();
}); 
app.use(express.json())

app.use(userRouter)
app.use(movieRouter)
app.use(categoryRouter)
app.use(actorRouter)



app.listen(port,()=>{
    console.log('app listining on port'+port)
})