const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Importamos el modelo de datos de mongo, para poder guardar los datos extraidos del req mas tarde

const Register = require('../mongo/models/register-mongo');

const createRegister = async (req, res) => {
  try {

    const { idEquipment, description } = req.body;

    const register= new Register();
    register.idEquipment=idEquipment;
    register.description=description;
    
    await register.save();

    res.send({ status: 'OK', message: 'Registro creado' });
  } catch (error) {
    res.status(400).send({ status: "ERROR", message: error.keyValue });
    }
};

const getAllRegister = async (req, res) => {
  try {

    //revisar que devuelva las fechas en donde se creo la historia, que solo devuelva las 
    // historias sobre un equipo determinado
    const {idEquipment} = req.body
      
    const arrayRegister = await Register.find({idEquipment})
    
    res.send({ status: 'OK', data: arrayRegister });
  } catch (error) {
    res.status(400).send({ status: "ERROR", message: error.keyValue });
    }
};

  


module.exports = {  
  createRegister,
  getAllRegister
};
