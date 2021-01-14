const express = require('express')
const cors = require('cors')
const { mongoose } = require('./config/database')
const app = express()
const port = 3015
const router = require('./config/route')

app.use(express.json())
app.use(cors())
app.use('/', router)

app.get('/',(req,res)=>{
    res.json({
        notice:"welcome to user authentication application"
    })
})

app.listen(port, function(){
    console.log('listening on port',3015)
})