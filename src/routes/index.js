const routes = (app) => {
  app.use('/api/contacts', require('./contactRoutes'));
  app.use('/api/users', require('./userRoutes'));
};

module.exports = routes;
