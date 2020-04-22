import assocPath from './assocPath'
import getProp from './getProp'
import keys from './keys'
import reduce from './reduce'

const assocMerge = (pathValues, props) =>
  reduce(
    (accum, path) => assocPath(path, getProp(path, pathValues), accum),
    props,
    keys(pathValues)
  )

export default assocMerge
