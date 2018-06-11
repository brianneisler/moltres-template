const createChannel = () => {
  const messageQueue = []
  const resolveQueue = []

  const put = (msg) => {
    if (resolveQueue.length) {
      const nextResolve = resolveQueue.shift()
      nextResolve(msg)
    } else {
      messageQueue.push(msg)
    }
  }

  const take = () => {
    if (messageQueue.length) {
      return Promise.resolve(messageQueue.shift())
    }
    return new Promise((resolve) => resolveQueue.push(resolve))
  }

  return {
    take,
    put
  }
}

export default createChannel
