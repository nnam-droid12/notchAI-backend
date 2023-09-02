const express = require('express')
const app = express()
const port = 5000 || process.env.PORT
const cors = require('cors') 
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/notchdb")


app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

app.use('/', require('./routes/user.routes'))



app.listen(port, () => {
   console.log(`Server running on port ${port}`)
})