import { flatten, map, pick, values } from 'ramda'

import booleanObjects from './booleanObjects'
import booleans from './booleans'
import nils from './nils'
import numberObjects from './numberObjects'
import numbers from './numbers'
import stringObjects from './stringObjects'
import strings from './strings'
import symbols from './symbols'

const typeMap = {
  booleanObjects,
  booleans,
  nils,
  numberObjects,
  numbers,
  stringObjects,
  strings,
  symbols
}

const primitives = (
  selected = ['booleans', 'nils', 'numbers', 'strings', 'symbols']
) => flatten(map((type) => type(), values(pick(selected, typeMap))))

export default primitives
