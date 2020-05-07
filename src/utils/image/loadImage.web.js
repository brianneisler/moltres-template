const loadImage = async (imageSrc) => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = (error) => reject(error)
      image.src = imageSrc
    } catch (error) {
      reject(error)
    }
  })
}

export default loadImage
