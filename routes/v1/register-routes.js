const express = require('express');

// Importamos el middleware
const { isAuth, isValidHostname } = require('../../middlewares/auth');
const registerController = require('../../controllers/register-controller');

/* Creamos un router, permitira definir direcciones para las funciones */

const routes = express.Router();


routes.post('/createRegister', isValidHostname, isAuth, registerController.createRegister);
routes.post('/getAllRegister', isValidHostname, isAuth, registerController.getAllRegister);

/* Exportamos nuestro router */

module.exports = routes;
