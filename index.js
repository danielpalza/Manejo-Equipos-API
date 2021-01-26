
const express = require('express');
const routesV1 = require('./routes/v1');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require("path")
const cors = require('cors');

// se usa process.env para acceder a la variable de entorno importada de env.
dotenv.config();
const app = express();

//Mejorar el cors para que admita 2 direcciones
/*let whitelist = ['https://manejo-equipos.vercel.app', 'http://localhost:5500']
function manageOrigin(){
    if(whitelist.indexOf(req.header('Origin')) !== -1){
        return true;
    }
    else{false}
}*/
let corsOptions = {
    "origin": 'http://localhost:5500',
    "preflightContinue": true,
    "optionsSuccessStatus": 200 // For legacy browser support
}


app.use(cors(corsOptions));

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


