const actions = {
  factory: require('./actions').default,
  info: require('./actions/driver.json')
}
const enhancers = {
  factory: require('./enhancers').default,
  info: require('./enhancers/driver.json')
}
const middleware = {
  factory: require('./middleware').default,
  info: require('./middleware/driver.json')
}
const reducers = {
  factory: require('./reducers').default,
  info: require('./reducers/driver.json')
}
const sagas = {
  factory: require('./sagas').default,
  info: require('./sagas/driver.json')
}

export {
  actions,
  enhancers,
  middleware,
  reducers,
  sagas
}
