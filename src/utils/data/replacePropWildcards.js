import { ImmutableMap } from './js'
import assocProp from './assocProp'
import getProp from './getProp'
import isImmutableMap from './isImmutableMap'
import keys from './keys'
import reduce from './reduce'
import replaceWildcards from './replaceWildcards'

const replacePropWildcards = (wildValues, object) =>
  reduce(
    (accum, prop) => assocProp(replaceWildcards(wildValues, prop), getProp(prop, object), accum),
    isImmutableMap(object) ? ImmutableMap({}) : {},
    keys(object)
  )

export default replacePropWildcards