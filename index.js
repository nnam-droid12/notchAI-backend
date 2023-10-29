const express = require('express')
const app = express()
const cors = require('cors') 
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('db connected'))
.catch((err) => console.log(err));

const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

app.use('/', require('./routes/user.routes'))
app.use('/', require('./routes/doctor.routes'))

app.get('/', (req, res) => res.send('Welcome to notchAI'))


app.listen(PORT, () =>
   console.log(`Server running on port ${PORT}`))