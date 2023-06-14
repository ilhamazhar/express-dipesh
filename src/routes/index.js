import contactRoutes from './contactRoutes.js';
import userRoutes from './userRoutes.js';

const routes = (app) => {
  app.use('/api/contacts', contactRoutes);
  app.use('/api/users', userRoutes);
};

export default routes;
