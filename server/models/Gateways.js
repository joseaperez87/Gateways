const mongoose = require('mongoose')
const Address4 = require('ip-address').Address4
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose;

const gatewaySchema = new Schema(
  {
    serial: {
      type: String,
      required: 'cannot be blank'
    },
    name: {
      type: String,
      required: 'cannot be blank'
    },
    ipv4: {
      type: String,
      validate: {
        validator: function(v){
            const address = new Address4(v)
            return address.isValid()
        },
        message: props => `${props.value} is not a valid IPv4 Address!`
      },
      unique: true
    },
    peripherals: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: "Periperals"
      }],
      validate: {
        validator : function (val){
          return val.length <= 10
        }, 
        message: "Exceeds limit of 10 peripherals by Gateway, select another gateway"
      }
    }
  },
  { collection: 'gateways' } 
);

gatewaySchema.plugin(uniqueValidator)
module.exports = mongoose.model('Gateways', gatewaySchema)