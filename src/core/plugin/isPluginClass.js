import { Plugin } from '../plugin'

export default function isPluginClass(value) {
  return value.prototype instanceof Plugin
}
