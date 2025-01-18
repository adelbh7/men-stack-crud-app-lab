const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  type:{type:String,required: true},
  color: {type:String,required:true},
  hybrid: {type:Boolean}  
})

const Car = mongoose.model('Car', plantSchema)
module.exports = Car
