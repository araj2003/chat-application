const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./database/connect')
const authRouter = require('./routes/authRoute')
const cors = require('cors')
//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.get('/',(req,res) => {
    res.send("hello world")
})

app.use('/api/auth',authRouter)

const port = 8000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('db connected')
        app.listen(port,() => {
            console.log(`app is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()