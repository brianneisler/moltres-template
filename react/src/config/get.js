import { is, path, split }  from 'ramda'
import config from './config'

export default function get(parts) {
  if (is(String, parts)) {
    return path(split('.', parts), config)
  }
  return path(parts, config)
}
