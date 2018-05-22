import { is, pathEq, split } from 'ramda'
import config from './config'

export default function has(path) {
  const parts = is(String, path) ? split('.', path) : path
  return !pathEq(parts, undefined, config)
}
