const express=require('express')
const userRouter=require('./routes/user')
const movieRouter=require('./routes/movie')
const categoryRouter=require('./routes/category')
const actorRouter=require('./routes/actor')
const app=express()
const port=process.env.PORT||3000
app.use(express.json())
//middlewares
app.use(userRouter)
app.use(movieRouter)
app.use(categoryRouter)
app.use(actorRouter)

app.listen(port,()=>{
    console.log('app listining on port'+port)
})