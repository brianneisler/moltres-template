const actions = {
  default: require('./actions').default,
  info: require('./actions/driver.json')
}
const enhancers = {
  default: require('./enhancers').default,
  info: require('./enhancers/driver.json')
}
const higherorder = {
  default: require('./higherorder').default,
  info: require('./higherorder/driver.json')
}
const middleware = {
  default: require('./middleware').default,
  info: require('./middleware/driver.json')
}
const reducers = {
  default: require('./reducers').default,
  info: require('./reducers/driver.json')
}
const sagas = {
  default: require('./sagas').default,
  info: require('./sagas/driver.json')
}
const selectors = {
  default: require('./selectors').default,
  info: require('./selectors/driver.json')
}

export {
  actions,
  enhancers,
  higherorder,
  middleware,
  reducers,
  sagas,
  selectors
}
