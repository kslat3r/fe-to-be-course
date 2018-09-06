'use strict';

const swaggerTools = require('swagger-tools');
const path = require('path');
const YAML = require('yamljs');

const spec = swaggerTools.specs.v2;

const swaggerInitialize = (app, swaggerApiDef, swaggerUi) => {
  swaggerTools
    .initializeMiddleware(swaggerApiDef, (middleware) => {
      app.middleware('routes:before', middleware.swaggerMetadata());
      app.middleware('routes:before', middleware.swaggerValidator());
      if (swaggerUi) {
        app.middleware('routes:before', middleware.swaggerUi(
          {
            apiDocs: swaggerUi.apiDocsMountPath,
            swaggerUi: swaggerUi.docsMountPath
          }
        ));
      }
    });
};

const getSwaggerApiDef = (swaggerApiDef) => {
  try {
    const yaml = typeof swaggerApiDef === 'object' ?
      YAML.load(path.resolve(swaggerApiDef.dirPath, swaggerApiDef.fileName)) : YAML.parse(swaggerApiDef);
    return yaml;
  } catch (err) {
    throw err;
  }
};

const validateSwagger = (swaggerApiDef) => {
  spec.validate(swaggerApiDef, (err, result) => result);
};

const initValidateResponse = (app, refs, swaggerApiDef) => {
  const validateResponse = ({req, res, methodString}, data, next) => (
    refs[methodString]
      ? spec.validateModel(
        swaggerApiDef,
        refs[methodString],
        data,
        (err, validation) => next((err || validation), req, res, next)
      )
      : next()
  );
  const models = Object.keys(refs);
  models.forEach((key) => {
    const modelname = key.split('.')[0].trim();
    app.models[modelname].afterRemote('**', validateResponse);
  });
};


module.exports = (app, {swaggerUi, swaggerApiDef, responseValidation}) => {
  const enableResponseValidation = (process.env.ENABLE_RESPONSE_VALIDATION === true || process.env.ENABLE_RESPONSE_VALIDATION === 'true');
  const apiDef = getSwaggerApiDef(swaggerApiDef);
  if (validateSwagger(apiDef)) {
    throw new Error('Not a valid swagger');
  }
  if (enableResponseValidation && responseValidation) {
    initValidateResponse(app, responseValidation, apiDef);
  }
  app.set('swagger-validator', {swaggerUi, swaggerApiDef, responseValidation});
  swaggerInitialize(app, apiDef, swaggerUi);
};

"ob-core-common-modules/utils/swagger-tools": {
  "swaggerUi": {
    "docsMountPath": "/explorer",
    "apiDocsMountPath": "/api-docs"
  },
  "swaggerApiDef": {
    "dirPath": "definitions",
    "fileName": "ob-pisp-domestic-scheduled-payment-consent-channel-api-swagger.yaml"
  },
  "responseValidation": {
    "consent.getConsent": "#/definitions/GetDomesticScheduledPaymentConsentResponse",
    "consent.saveConsent": "#/definitions/CreateDomesticScheduledPaymentConsentResponse",
    "consent.cancelConsent": "#/definitions/CancelDomesticScheduledPaymentConsentResponse",
    "consent.verifyConsent": "#/definitions/VerifyDomesticScheduledPaymentConsentResponse"
  }
},
