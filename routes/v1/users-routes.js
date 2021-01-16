const express = require("express");

// Importamos el middleware
const { isAuth, isValidHostname } = require("../../middlewares/auth");
const usersController = require("../../controllers/users-controller");

const routes = express.Router();

/*routes.post('/createElement',isValidHostname, isAuth, elementController.createUser);*/

routes.post("/createUser", isValidHostname, usersController.createUser);
routes.post("/deleteUser", isValidHostname, isAuth, usersController.deleteUser);
routes.get("/getUsers", isValidHostname, isAuth, usersController.getUser);
routes.post("/updateUser", isValidHostname, isAuth, usersController.updateUser);
routes.post("/login", isValidHostname, usersController.login);
routes.get("/authToken", isValidHostname, isAuth, usersController.authToken);

/* Exportamos nuestro router */

module.exports = routes;
