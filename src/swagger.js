const listEndpoints = require('express-list-endpoints');

function generateSwaggerSpec(app, options = {}) {
  // Determine the server URL dynamically
  const serverUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`;

  const baseSpec = {
    openapi: '3.0.0',
    info: {
      title: options.title || 'API Documentation',
      version: options.version || '1.0.0',
      description: options.description || 'Automatically generated by apidocify',
    },
    paths: {},
    components: options.components || {},
    servers: [{ url: serverUrl }], // Use dynamic server URL
    tags: options.tags || []
  };

  const endpoints = listEndpoints(app);
  endpoints.forEach(endpoint => {
    endpoint.methods.forEach(method => {
      const oapiPath = endpoint.path.replace(/:(\w+)/g, '{$1}');
      baseSpec.paths[oapiPath] = baseSpec.paths[oapiPath] || {};
      
      baseSpec.paths[oapiPath][method.toLowerCase()] = {
        summary: endpoint?.apidoc?.summary || `${method} ${endpoint.path}`,
        parameters: detectPathParams(endpoint.path),
        responses: endpoint?.apidoc?.responses || { 200: { description: 'Success' } },
        ...(endpoint.apidoc || {}) // Allow custom OpenAPI fields
      };
    });
  });

  return baseSpec;
}

function detectPathParams(path) {
  const params = path.match(/:(\w+)/g) || [];
  return params.map(param => ({
    name: param.slice(1),
    in: 'path',
    required: true,
    schema: { type: 'string' }
  }));
}

module.exports = generateSwaggerSpec;