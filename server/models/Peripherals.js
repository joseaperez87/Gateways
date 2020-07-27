const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const autoIncrement = require('mongoose-auto-increment')

const { Schema } = mongoose;

autoIncrement.initialize(mongoose)
const peripheralSchema = new Schema(
  {
    UID: {
      type: Number,
      unique: true
    },
    vendor: {
      type: String,
      required: 'Vendor cannot be blank'
    },
    date: {
      type: Date,
      default: Date.now
    },
    status : {
      type: String,
      default: true
    },
    gateway:{
      type: Schema.Types.ObjectId,
      ref: "Gateways"
    }
  } 
);

peripheralSchema.plugin(uniqueValidator)
peripheralSchema.plugin(autoIncrement.plugin, { model: 'Peripherals', field: 'UID' })

module.exports = mongoose.model('Peripherals', peripheralSchema)