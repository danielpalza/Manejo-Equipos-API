
const express = require('express');
const routesV1 = require('./routes/v1');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require("path")

// se usa process.env para acceder a la variable de entorno importada de env.
dotenv.config();
const app = express();

// Db connection
const { mongoose } = require('./database');

// Settings 
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(bodyParser.json());

// Routes
routesV1(app);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});


