const gatewayBuilder = require('../controllers/gatewaysController')
const peripheralBuilder = require('../controllers/peripheralsController')

module.exports = app => {
    app.route('/api/gateways')
      .get(gatewayBuilder.list)
      .post(gatewayBuilder.create)

    app.route('/api/gateway/:gID')
      .get(gatewayBuilder.get)

    app.route('/api/gateway/remove')
      .post(gatewayBuilder.remove)

    app.route('/api/peripheral')
      .post(peripheralBuilder.addPeripheral)

    app.route('/api/peripheral/:pID')
      .get(peripheralBuilder.show)
    app.route('/api/peripheral/remove')
      .post(peripheralBuilder.remove)
}