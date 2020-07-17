import createFactory from './createFactory'

const mapProps = (propsMapper) => (factory) =>
  createFactory((props, ...rest) =>
    factory(propsMapper(props, ...rest), ...rest)
  )

export default mapProps
