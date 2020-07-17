import createChannel from '../../core/createChannel'

import assocMerge from './assocMerge'
import assocPath from './assocPath'
import equals from './equals'

const createPropStore = (channel) => {
  if (!channel) {
    throw new Error('Channel is required')
  }
  let props = {}
  let first = true
  const propChannel = createChannel()

  const getProps = () => props
  const put = (action) => {
    let nextProps
    if (action.type === 'error') {
      nextProps = assocPath(action.key, { error: action.error }, props)
    } else if (action.type === 'assoc') {
      nextProps = assocPath(action.key, action.value, props)
    } else if (action.type === 'assocMerge') {
      nextProps = assocMerge(action.value, props)
    } else if (action.type === 'set') {
      nextProps = action.value
    } else {
      throw new Error(`unsupported action type ${action.type}`)
    }

    if (!equals(nextProps, props) || first) {
      first = false
      props = nextProps
      propChannel.put(props)
      channel.put({ type: 'refresh' })
    }
  }
  return {
    getProps,
    put,
    take: propChannel.take
  }
}

export default createPropStore
