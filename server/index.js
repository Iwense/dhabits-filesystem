import express from 'express'
import mongoose from 'mongoose'
import serverRoutes from './routes/api.js'
import authRoutes from './routes/auth.js'
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: false}))
app.use(cookieParser())

//Routes
app.use(serverRoutes)
app.use(authRoutes)


app.post('/', (req,res)=> {
    console.log(req.body)
    res.send("<h1>Hello world</h1>")
})

app.get('/', (req,res)=> {
    console.log(req.body)
    res.send("<h1>Hello world</h1>")
})

async function start () {
    try{
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true} )
        app.listen(PORT, () => console.log("SERVER WORKING ON PORT ", PORT))
    }catch(e){
        console.log(e)
    }
}

start()