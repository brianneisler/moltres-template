import { eventChannel } from 'moltres'

const createClockChannel = (frequency) => {
  return eventChannel((emitter) => {
    const interval = setInterval(() => {
      emitter(Date.now())
    }, frequency)
    return () => {
      clearInterval(interval)
    }
  })
}

export default createClockChannel
