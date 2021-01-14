const mongoose = require('mongoose');
const { Schema } = mongoose;

const registerSchema = new Schema(
  {
  	/*debe guardar el id del equipo al que hace referencia el registro*/
    idEquipment: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// se crea el modelo que se usara, con un string user como el nombre con el que se llamara, y el esquema
const model = mongoose.model('Register', registerSchema);

// se exporta el modelo

module.exports = model;

