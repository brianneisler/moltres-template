const actions = {
  factory: require('./actions').default,
  info: require('./actions/driver.json')
};
const enhancers = {
  factory: require('./enhancers').default,
  info: require('./enhancers/driver.json')
};
const reducers = {
  factory: require('./reducers').default,
  info: require('./reducers/driver.json')
};

export {
  actions,
  enhancers,
  reducers
};
