import express from 'express'
import mongoose from 'mongoose'
import serverRoutes from './routes/api.js'
import cors from 'cors';

const app = express()
const PORT = process.env.PORT || 5000
const DB_URL = 'mongodb+srv://user:user@cluster0.o7q6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())
// app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(serverRoutes)
app.use(cors({origin: false}))

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
        await mongoose.connect(DB_URL, { useNewUrlParser: true , useUnifiedTopology: true} )
        app.listen(PORT, () => console.log("SERVER WORKING ON PORT ", PORT))
    }catch(e){
        console.log(e)
    }
}

start()