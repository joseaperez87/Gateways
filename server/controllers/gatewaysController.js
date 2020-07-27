const mongoose = require('mongoose')
const gateway = mongoose.model('Gateways')
const peripheral = mongoose.model('Peripherals')

let gatewayBuilder = {
  list : async (req, res) => {
    await gateway.find({}, (err, tasks) => {
      if (err) res.send(err)
      res.json(tasks)
    })
  },

  create : async (req, res) => {
      const ip = require('ip')
      await gateway.create ({
          serial : req.body.serial,
          name : req.body.name,
          ipv4 : req.body.ipv4
      }, (err) => {
        if (err) return res.send(err)
        res.status(201).send("Gateway created successfully")
      })
  },

  get : async (req, res) => {
    let g = await (await gateway.findById (req.params.gID))
    res.json(g)
  },

  remove: async (req, res) => {
    await gateway.findById(req.body.gID, (err, gate) => {
      if (err) return res.send(err)
      if(gate){
        const per = gate.peripherals
        if(per.length > 0){
          peripheral.deleteMany({_id : per}, (err) => {
            if (err) return res.send(err)
          })
        }
        gate.remove()
        res.send("Gateway and all peripherals removed successfully")
      }else{
        res.send({errors : 'Gateway not found'})
      }
    })
  }
}

module.exports = gatewayBuilder