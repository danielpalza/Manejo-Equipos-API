/* importamos los routes de los componentes */

const userRoutes = require('./users-routes');
const equipmentsRoutes = require('./equipment-routes');
const registerRoutes = require('./register-routes');

// users and admins

module.exports = (app) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/equipment', equipmentsRoutes);
  app.use('/api/v1/register', registerRoutes);

  
};
