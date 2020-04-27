const isTestAppConfigured = (config) =>
  config.stage === 'local' || (config.test && !config.test.integration)

export default isTestAppConfigured
