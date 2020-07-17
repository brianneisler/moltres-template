const delay = (method, duration) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(method())
      } catch (error) {
        reject(error)
      }
    }, duration)
  })

export default delay
