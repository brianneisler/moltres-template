import { append } from '../../../../utils/lang'

const mixpanelTrack = async (mixpanel, { eventName, options, properties }) =>
  new Promise((resolve) => {
    let args = [eventName]
    if (properties) {
      args = append(properties, args)
    }
    if (options) {
      args = append(options, args)
    }
    args = append((after) => {
      // eslint-disable-next-line no-console
      console.log('after tracking - after:', after)
      resolve(after)
    }, args)
    const result = mixpanel.track.apply(mixpanel, args)
    if (!result) {
      return resolve(result)
    }
  })

export default mixpanelTrack
