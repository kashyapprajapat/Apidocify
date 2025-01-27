const swaggerUi = require('swagger-ui-express');
const generateSwaggerSpec = require('./swagger');

class apidocify {
  constructor(app, options = {}) {
    if (!app || typeof app !== 'function') {
      throw new Error('You must provide a valid Express app instance.');
    }

    const { docsPath = '/docs', ...swaggerOptions } = options;

    // Generate the Swagger specification
    const swaggerSpec = generateSwaggerSpec(app, swaggerOptions);

    // Serve Swagger UI
    app.use(docsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`API documentation available at ${docsPath}`);
  }
}

module.exports = apidocify;
