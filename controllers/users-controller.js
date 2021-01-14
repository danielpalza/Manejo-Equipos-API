// Permite la encriptacion de un valor:
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../mongo/models/user-mongo');
const TextToSVG = require('text-to-svg');


const login = async (req, res) => {
  try {
   
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (user) {
      //
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        // se verifico el password del usuario, se retorna sus datos,
        // se retorna el token, con un expiresIN de 10 minutos(60s por 10).

     

        const token = jwt.sign(
          { userId: user._id, name: user.name, lastName: user.lastName},
          process.env.JWT_SECRET,
          {
            expiresIn: 60 * 60,
          }
        );
        res.send({ status: 'OK', data: { token, expiresIn: 60 * 60 } });
      } else {
        res.status(403).send({ status: 'ERROR', message: 'Contraseña invalida' });
      }
    } else {
      res.status(401).send({ status: 'ERROR', message: 'Usuario no encontrado' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message:"Ocurrio un error", text: e.message });
  }
};

const authToken = async (req, res) => {
  try {
    const { token } = req.headers;
    const decode = jwt.decode(token, {complete: true} );
 
    const {userId, name, lastName, svg}=decode.payload
    const newToken = jwt.sign({userId, name, lastName, svg}, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    console.log("newToken: ", newToken)
    res.send({ status: 'OK', data: { token:newToken, expiresIn: 60 * 60 } });
  } catch (error) {
    res
      .status(400)
      .send({ status: 'ERROR', text: error.message });
  }
};

// async permite usar una funcion asincrona
const createUser = async (req, res) => {
  try {
    console.log('req.body:', req.body);

    const { password, email, name, lastName } = req.body;
    const salt = 10;

    const user = new User();

    user.password = await bcrypt.hash(password, salt);
    user.name = name;
    user.lastName = lastName;
    user.email = email;

    await user.save();

    res.send({ status: 'USER_CREATED', message: 'Usuario creado' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(400).send({ status: 'ERROR', message: "El email ya esta registrado" , text: error.message});
    } else {
      res.status(400).send({ status: 'ERROR', message: "Ocurrio un error", text: error.message });
    }
  }
};



const deleteUser = async (req, res) => {
  // verificar que sea el mismo usuario el que quiere eliminarse, verificar password y luego eliminar.
  try {
    const { userId, password } = req.body;

    if (!userId) {
      throw { status: 'ERROR', message: 'Usuario no encontrado', text: e.message  };
    } else {
      const user = await User.findById(userId);
      if (await bcrypt.compare(password, user.password)) {
        await User.findByIdAndDelete(userId);
      } else {
        throw { status: 'ERROR', message: 'Contraseña incorrecta', text: e.message  };
      }
    }

    res.send({ status: 'OK', message: 'Usuario Borrado' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR',  message: "Ocurrio un error", text: e.message });
  }
};


const getUser = async (req, res) => {
  try {
    const users = await User.find();

    res.send({ status: 'ok', data: users });
  } catch (e) {

    res.status(500).send({ status: 'error', message: "Ocurrio un error", text: e.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { userId, username, email, password, lastName } = req.body;
    const user = await User.findOneById({userId})
    if (await bcrypt.compare(password, user.password)) {
      await User.findByIdAndUpdate(userId, {
        username,
        email,
        lastName,
      });
      res.send({ status: 'OK', message: 'Usuario actualizado' });
    }
  } catch (error) {
    
    res.status(500).send({ status: 'ERROR', message: "Ocurrio un error", text: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  login,
  authToken
};
