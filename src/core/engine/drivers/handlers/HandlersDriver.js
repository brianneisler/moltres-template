static createHandlers() {
  const drivers = Engine.getDriversInDependencyOrder()
  return _.reduce(drivers, (handlers, driver) => {
    if (_.isFunction(_.get(driver, 'createHandler'))) {
      const { name } = driver.info
      const handler = driver.createHandler()
      if (name && handler) {
        return _.set(handlers, name, handler)
      }
    }
    return handlers
  }, {})
}
