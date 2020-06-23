import { flatten } from 'ramda'
import arrays from './arrays'
import booleans from './booleans'
import errors from './errors'
import functions from './functions'
import generators from './generators'
import immutables from './immutables'
import nativeJsClasses from './nativeJsClasses'
import nils from './nils'
import numberObjects from './numberObjects'
import numbers from './numbers'
import objects from './objects'
import stringObjects from './stringObjects'
import strings from './strings'
import symbols from './symbols'

const values = () =>
  flatten([
    arrays(),
    booleans(),
    errors(),
    functions(),
    generators(),
    immutables(),
    nativeJsClasses(),
    nils(),
    numberObjects(),
    numbers(),
    objects(),
    stringObjects(),
    strings(),
    symbols()
  ])

export default values
