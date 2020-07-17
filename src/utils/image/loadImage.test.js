import createBuffer from '../buffer/createBuffer'
import { fetch } from '../request'

import loadImage from './loadImage'

describe('loadImage', () => {
  test('correctly loads an image from buffer', async () => {
    const imageUrl = 'https://s3.amazonaws.com/wat-prod/usgs-girl.jpg'
    const response = await fetch(imageUrl)

    if (response.status >= 400) {
      throw new Error(`Could not download image from ${imageUrl}`)
    }

    const buffer = createBuffer(await response.arrayBuffer())
    const result = await loadImage(buffer)
    expect(result.height).toBe(637)
    expect(result.width).toBe(850)
  }, 60000)
})
