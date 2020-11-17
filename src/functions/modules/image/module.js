import { expected } from 'moltres/error'
import { asyncHandler } from 'moltres/express'
import { createFileReadStream } from 'moltres/storage'

import { Code } from '../../../constants'
import { getImageById } from '../../../modules/image'

const mod = () => ({
  setupRouter(router) {
    router.get(
      '/content/image/:id',
      asyncHandler(async (request, response) => {
        const { context } = request
        const { id } = request.params
        try {
          const image = await getImageById(context, id)
          return new Promise((resolve, reject) => {
            const imageReadStream = createFileReadStream(context, image.path)
            imageReadStream
              .on('error', (error) => reject(error))
              .on('response', (imageResponse) => {
                const { headers } = imageResponse
                response.setHeader('Cache-Control', 'public, max-age=31536000')
                response.setHeader('Content-Type', headers['content-type'])
                response.setHeader('Content-Length', headers['content-length'])
              })
              .on('end', () => {
                response.end()
                resolve()
              })
              .pipe(response)
          })
        } catch (error) {
          if (
            error.code === Code.NOT_FOUND ||
            error.code === Code.ACCESS_DENIED
          ) {
            throw expected({
              causes: [error],
              code: Code.NOT_FOUND,
              message: `Image with the id ${id} does not exist`
            })
          }
        }
      })
    )

    return router
  }
})

export default mod
