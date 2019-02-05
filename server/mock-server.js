const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const bodyParser = require('body-parser');
const sendDataWithRef = require('./sendDataWithRef');
const port = config.port;

const app = express();
app.use(cors());
app.use(bodyParser.json({strict: false , type: 'application/vnd.worldpay.payments-v0.4+json'}));

app.get('/payments/', (req, res) => res.send(require('./data/root.json')));

app.post('/payments/authorizations', (req, res) => sendDataWithRef('./data/authorizations.json', req, res));
app.post('/payments/authorizations/cancellations/:ref', (req, res) => sendDataWithRef('./data/cancel.json', req, res, false));

app.post('/payments/settlements/full/:ref', (req, res) => sendDataWithRef('./data/settle.json', req, res, false));
app.post('/payments/settlements/refunds/full/:ref', (req, res) => res.sendStatus(202));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
