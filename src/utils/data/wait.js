const wait = (duration) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })

export default wait
