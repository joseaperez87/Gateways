const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');

//Load Router and Models
global.Gateway = require('./models/Gateways');
global.Peripheral = require('./models/Peripherals');
const routes = require('./routes/routes');


//MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost:27017/gateways',
  { useNewUrlParser: true }
)

const app = express()
//Init Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// Define routes Root path
routes(app)

const port = process.env.PORT || 3000

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => console.log(`Server is running on port ${port}`))