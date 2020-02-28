const hystrix = require('hystrixjs');
const hystrixConfig = hystrix.hystrixConfig;
const commandFactory = hystrix.commandFactory;

module.exports = (name) => {
  hystrixConfig.init({
    'hystrix.circuit.volumeThreshold.forceOverride': false,
    'hystrix.circuit.volumeThreshold.override': 5,
    'hystrix.promise.implementation': Promise
  });

  return commandFactory.getOrCreate(name)
    .timeout(10000)
    .circuitBreakerForceClosed(false)
    .circuitBreakerSleepWindowInMilliseconds(10000)
    .circuitBreakerErrorThresholdPercentage(25)
    .circuitBreakerRequestVolumeThreshold(5)
    .statisticalWindowLength(10000)
    .statisticalWindowNumberOfBuckets(10)
    .run((obj, operation, params) => obj[operation](...params))
    .build();
};
