const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./app/routes/routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use(cors({credentials: true, origin: true}));

app.use('/api', router);
app.listen(port);

console.log('Magic happens on port ' + port);
