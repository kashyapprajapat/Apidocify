const swaggerUi = require('swagger-ui-express');
const generateSwaggerSpec = require('./swagger');

class Apidocify {
  constructor(app, options = {}) {
    this.validateInput(app);
    
    const { docsPath = '/docs', ...swaggerOptions } = options;
    const swaggerSpec = generateSwaggerSpec(app, swaggerOptions);
    
    app.use(docsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Log the correct documentation URL
    const serverUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`;
    console.log(`📚 API Documentation: ${serverUrl}${docsPath}`);
  }

  validateInput(app) {
    if (!app || typeof app.use !== 'function') {
      throw new Error('Invalid Express app instance provided');
    }
  }
}

module.exports = Apidocify;