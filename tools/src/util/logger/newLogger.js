const newLogger = () => ({
  log: (...args) => console.log(...args) // eslint-disable-line no-console
})

export default newLogger
