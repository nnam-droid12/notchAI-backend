const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    hospitalname: { type: String, required:true},
    specialty: {type: String, required:true},
    yearsofexperience: {type: String, required:true},
    batchno: {type: String, required:true, unique: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model('Doctor', newSchema)