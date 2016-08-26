import _ from 'mudash'
import { exception } from 'bug-js'

export default function refineTargetOption(options, defaultTarget) {
  let target = ''
  if (options.global) {
    target = 'global'
  }
  if (options.user) {
    if (target) {
      throw exception('TooManyContexts', {}, 'One context at a time')
    }
    target = 'user'
  }
  if (options.project) {
    if (target) {
      throw exception('TooManyContexts', {}, 'One context at a time')
    }
    target = 'project'
  }
  if (!target && defaultTarget) {
    target = defaultTarget
  }
  return { target }
}

export function defineOptions(options, suppliedDefaults) {
  options             = options || {}
  suppliedDefaults    = suppliedDefaults || {}
  const defaults      = {
    execPath: process.cwd()
  }
  return _.assign({}, defaults, suppliedDefaults, options)
}
