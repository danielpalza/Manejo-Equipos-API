const express = require('express');

// Importamos el middleware
const { isAuth, isValidHostname } = require('../../middlewares/auth');
const equipmentController = require('../../controllers/equipment-controller');

const routes = express.Router();

/*routes.post('/createElement',isValidHostname, isAuth, elementController.createUser);*/

routes.post('/createEquipment',isValidHostname, isAuth, equipmentController.createEquipment);
routes.post('/deleteEquipment',isValidHostname, isAuth, equipmentController.deleteEquipment);
routes.post('/updateEquipment',isValidHostname, isAuth, equipmentController.updateEquipment);
routes.get('/getAllEquipment',isValidHostname, isAuth, equipmentController.getAllEquipment);
routes.post('/getEquipment',isValidHostname, isAuth, equipmentController.getEquipment);

/* Exportamos nuestro router */

module.exports = routes;
