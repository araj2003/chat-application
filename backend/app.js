const express = require('express')
const app = express()

const port = 8000

app.get('/',(req,res) => {
    res.send("hello world")
})


const start = async() => {
    try {
        app.listen(port,() => {
            console.log(`app is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()