import { Driver } from '../driver'

export default function isDriverClass(value) {
  return value.prototype instanceof Driver
}
