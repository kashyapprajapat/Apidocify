const listEndpoints = require('express-list-endpoints');

function generateSwaggerSpec(app, options = {}) {
  const {
    title = 'API Documentation',
    version = '1.0.0',
    description = 'Automatically generated API documentation',
  } = options;

  const endpoints = listEndpoints(app);
  const paths = {};

  // Map Express routes to OpenAPI paths
  endpoints.forEach((endpoint) => {
    endpoint.methods.forEach((method) => {
      const path = endpoint.path.replace(/:([^/]+)/g, '{$1}'); // Convert :param to {param}
      paths[path] = paths[path] || {};
      paths[path][method.toLowerCase()] = {
        description: `Auto-generated route for ${method} ${endpoint.path}`,
        responses: {
          200: { description: 'Success' },
        },
      };
    });
  });

  return {
    openapi: '3.0.0',
    info: {
      title,
      version,
      description,
    },
    paths,
  };
}

module.exports = generateSwaggerSpec;
