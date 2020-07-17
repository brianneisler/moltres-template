import { isImmutable } from 'immutable'

import { ImmutableList, ImmutableMap, Map } from './classes'
import isArray from './isArray'
import isImmutableList from './isImmutableList'
import isImmutableMap from './isImmutableMap'
import isIndex from './isIndex'
import isKey from './isKey'
import isObject from './isObject'
import isProperty from './isProperty'
import isString from './isString'

const contagion = (value, sample) => {
  if (!sample) {
    if (isArray(value)) {
      return []
    }
    if (isImmutableMap(value)) {
      return new ImmutableMap({})
    }
    if (isImmutableList(value)) {
      return new ImmutableList([])
    }
    if (isImmutable(value)) {
      throw new Error(
        `This kind of Immutable value is not currently supported ${value}`
      )
    }
    if (isObject(value)) {
      return {}
    }
    if (isString(value)) {
      return value
    }
    throw new Error(`unsupported value given to contagion function: ${value}`)
  }

  if (isArray(value)) {
    if (isIndex(sample)) {
      return []
    }
    if (isProperty(sample)) {
      return {}
    }
    if (isKey(sample)) {
      return new Map()
    }
    throw new Error(`unsupported sample for Array value ${sample}`)
  }

  if (isImmutableList(value)) {
    if (isIndex(sample)) {
      return ImmutableList([])
    }
    if (isKey(sample)) {
      return ImmutableMap()
    }
    throw new Error(`unsupported sample for ImmutableList value ${sample}`)
  }

  if (isImmutableMap(value)) {
    if (isIndex(sample)) {
      return ImmutableList([])
    }
    if (isKey(sample)) {
      return ImmutableMap()
    }
    throw new Error(`unsupported sample for ImmutableMap value ${sample}`)
  }

  if (isObject(value)) {
    if (isIndex(sample)) {
      return []
    }
    if (isProperty(sample)) {
      return {}
    }
    if (isKey(sample)) {
      return new Map()
    }
    throw new Error(`unsupported sample for ImmutableMap value ${sample}`)
  }

  throw new Error(`unsupported value given to contagion function: ${value}`)
}

export default contagion
