const jwt = require('jsonwebtoken');

// Creamos el middleware
const isValidHostname = (req, res, next) => {
  // array con los hostnames validos, de esta forma se puede permitir varios
  const hostValid = [ 'localhost','manejo-equipos-api.herokuapp.com'];

  // Se comprueba que el hostname del solicitante es el correcto, su ip
  if (hostValid.includes(req.hostname)) {
    // Si la comprobacion se da bien, next ejectutara la funcion siguiente.
    console.log("Host autorizado");
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED', message: "WRONG_HOST" });
  }
};

const isAuth = (req, res, next) => {
  // se debe hacer un try y catch, ya que verify de jwt devuelve una excepcion si no se cumple, lo
  // que paraliza el server
  try {
    // Se recibira el token por los headers, si existe, se continuara, sino, dara un
    // mensaje de error
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
    
      console.log("Autorizado acceso");
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'missing headers token'
      };
    }

   
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

const isAdmin = (req, res, next) => {
  // se debe hacer un try y catch, ya que verify de jwt devuelve una excepcion si no se cumple, lo
  // que paraliza el server
  try {
    const { role, userId } = req.headerSession;
    console.log('isAdmin:', role);
    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Invalid Role'
      };
    }
    req.headerSession = { role, userId };
    next();
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: 'Invalid role' });
  }
};

// siempre cerrar en llaves si va a ser una importacion parcial
module.exports = { isAuth, isValidHostname, isAdmin };
