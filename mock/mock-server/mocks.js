const successStubForPost = require('./stubs/standing-order-service-request-enterprise-post/successStub.json');
const errorStubForPost = require('./stubs/standing-order-service-request-enterprise-post/errorStub.json');
const successStubsForDelete = require('./stubs/standing-order-service-request-enterprise-delete/successStub.json');
const errorStubsForDelete = require('./stubs/standing-order-service-request-enterprise-delete/errorStub.json');
const successStubsForGet = require('./stubs/standing-order-service-request-enterprise-get/successStub.json');
const errorStubsForGet = require('./stubs/standing-order-service-request-enterprise-get/errorStub.json');
const successStubsForQuery = require('./stubs/standing-order-service-request-enterprise-query/successStub.json');
const errorStubsForQuery = require('./stubs/standing-order-service-request-enterprise-query/errorStub.json');
const intentResolverPost = require('./stubs/intent-resolver/intent-resolver-post.json');
const errorsStubsForList = require('./stubs/standing-order-service-request-enterprise-list/errorStub.json');
const successStubsForList = require('./stubs/standing-order-service-request-enterprise-list/successStub.json');
module.exports = [
  {
    hostname: 'ob-pisp-standing-order-service-request-channel-api-mock.lbg.eu-gb.mybluemix.net',
    port: 80,
    stubs: [
      ...successStubForPost,
      errorStubForPost,
      successStubsForDelete,
      errorStubsForDelete,
      ...successStubsForGet,
      ...errorStubsForGet,
      ...successStubsForQuery,
      ...errorStubsForQuery,
      ...errorsStubsForList,
      ...successStubsForList
    ]
  },
  {
    hostname: 'ob-pisp-intent-resolver-es-mock.lbg.eu-gb.mybluemix.net',
    port: 80,
    stubs: [
      ...intentResolverPost
    ]
  }
];
