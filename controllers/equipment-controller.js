const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Importamos el modelo de datos de mongo, para poder guardar los datos extraidos del req mas tarde

const Equipment = require('../mongo/models/equipment-mongo');

//hacer que el ID no sea igual a otros ID
const createEquipment = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const { token } = req.headers;
    const { model, marca, id, serie, fechaIngreso, fechaEgreso } = req.body;
    const { payload } = jwt.decode(token, { complete: true });

    //Verificar que el id del equipo no exista
    const equipment = new Equipment();
    equipment.idUser = payload.userId;
    equipment.model = model;
    equipment.marca = marca;
    equipment.id = id;
    equipment.serie = serie;
    equipment.fechaIngreso = fechaIngreso;

    //Arreglar fecha de egreso, esta debe ser controlada en el front
    equipment.fechaEgreso =
      fechaEgreso === '' || fechaEgreso === undefined
        ? 'Equipo en servicio'
        : fechaEgreso;

    await equipment.save();

    res.send({ status: 'OK', message: 'Equipo creado' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(400).send({ status: 'ERROR', message:"El equipo ya existe", text: error.message });
    } else {
      res.status(400).send({ status: 'ERROR', message:"Ocurrio un error", text: error.message });
    }
  }
};

const updateEquipment = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const { model, marca, _id, id, serie, fechaEgreso } = req.body;

    await Equipment.findOneAndUpdate(
      { id },
      {
        model,
        marca,
        serie,
        fechaEgreso: fechaEgreso === '' ? 'Equipo en servicio' : fechaEgreso,
      }
    );

    res.send({ status: 'OK', message: 'Cambios guardados' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 'ERROR', message:"Ocurrio un error", text: error.keyValue });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    //Agregar un control para que conste que usuario lo elimino
    console.log('req.body:', req.body);
    const { _id } = req.body;

    await Equipment.findOneAndDelete({_id });

    res.send({ status: 'OK', message: 'Equipo eliminado' });
  } catch (error) {
    res.status(400).send({ status: 'ERROR', message:"Ocurrio un error", text: error.keyValue });
  }
};

const getAllEquipment = async (req, res) => {
  try {
 
    const query = await Equipment.find();
    
    res.send({ status: 'OK', data: query });
  } catch (error) {
    res.send({ status: 'ERROR', message:"Ocurrio un error", text: error.message });
  }
};
const getEquipment = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    //Agregar para que busque tambien por modelo, fecha de ingreso y demas
    const { id } = req.body;

    const query = await Equipment.findOne({ id });

    res.send({ status: 'OK', data: query });
  } catch (error) {
    res.send({ status: 'ERROR', message:"Ocurrio un error", text: error.keyValue });
  }
};

module.exports = {
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getAllEquipment,
  getEquipment,
};
