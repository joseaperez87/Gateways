const mongoose = require('mongoose')
const Gateway = mongoose.model('Gateways')
const Peripheral = mongoose.model('Peripherals')


let peripheralBuilder = {
    addPeripheral : (req, res) => {
        const p = new  Peripheral ({
            vendor : req.body.vendor,
            status : req.body.status
        })
        Gateway.findById(req.body.gID, (err, gate) => {
            if (err) res.send(err)
            if(gate){
                if(gate.peripherals){
                    p.save((err) => {
                        gate.peripherals.push(p)
                        gate.save((err) => {
                            if (err) return res.send(err)
                            res.status(201).send('Peripheral Added')
                        })
                    })
                }
            }
        })
    },
    remove : async (req, res) => {
        Peripheral.findById(req.body.pID, (err, per) => {
            if(per){
                if (err) res.send(err)
                per.remove((err) => {
                    if (err) res.send(err)
                    Gateway.update(
                        { _id: req.body.gID },
                        { $pull: { peripherals: req.body.pID} },(err) => {
                            if (err) res.send(err)
                            res.json({
                                message: 'Peripheral successfully deleted'
                            });
                        }
                    )
                })
            }else{
                res.json({
                    message: 'Peripheral not found'
                });
            }
        })
    },
    show : async (req, res) => {
        await Peripheral.findById(req.params.pID, (err, tasks) => {
            if (err) res.send(err)
            res.json(tasks)
        });
    }
}

module.exports = peripheralBuilder;