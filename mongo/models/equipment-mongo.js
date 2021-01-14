const mongoose = require('mongoose');
const { Schema } = mongoose;

const equipmentSchema = new Schema({
  idUser:{ type: String, required: true },
  model: { type: String, required: true },
  marca: { type: String, required: true },
  serie: { type: String, required: true },
  id: { type: String, required: true, unique: true},
  fechaIngreso: { type: String},
  fechaEgreso: { type: String},

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

// se crea el modelo que se usara, con un string user como el nombre con el que se llamara, y el esquema
const model = mongoose.model('Equipment', equipmentSchema);

module.exports = model;

