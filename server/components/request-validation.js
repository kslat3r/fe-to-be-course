const swaggerTools = require('swagger-tools');
const path = require('path');
const YAML = require('yamljs');
const spec = swaggerTools.specs.v2;

module.exports = (app, opts) => {
  const swagger = YAML.load(path.resolve(opts.path));

  spec.validate(swagger, () => {});

  return swaggerTools
    .initializeMiddleware(swagger, (middleware) => {
      app.middleware('routes:before', middleware.swaggerMetadata());
      app.middleware('routes:before', middleware.swaggerValidator());
    });
};
