import anyIsIndex from './anyIsIndex'
import arrayFilter from './arrayFilter'
import objectProperties from './objectProperties'

const arrayProperties = (array) =>
  arrayFilter(objectProperties(array), (value) => !anyIsIndex(value))

export default arrayProperties
