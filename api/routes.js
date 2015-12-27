// Controller imports
import mock from './controllers/mock';

export default (app) => {
  // Decorate the express instance with the controller routers
  app.use('/api/mock', mock);
};