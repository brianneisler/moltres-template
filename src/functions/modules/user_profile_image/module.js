import { Code } from '../../../constants'
import getImageById from '../../../db/Image/getImageById'
import findUserProfileImageById from '../../../db/UserProfileImage/findUserProfileImageById'
import { expected } from '../../../utils/error'
import asyncHandler from '../../../utils/express/asyncHandler'
import resizeImageToStream from '../../../utils/image/resizeImageToStream'
import downloadFile from '../../../utils/storage/downloadFile'
// import findOrCreateUserProfileImageFromBuffer from '../../../sdk/user/findOrCreateUserProfileImageFromBuffer'

const mod = {
  setupRouter: (router) => {
    router.get(
      '/content/user_profile_image/:id',
      asyncHandler(async (request, response) => {
        const { context } = request
        const { id } = request.params
        try {
          const userProfileImage = await findUserProfileImageById(context, id)
          const image = await getImageById(context, userProfileImage.imageId)
          const fileBuffer = await downloadFile(context, image.path)
          const imageStream = await resizeImageToStream(fileBuffer, {
            maxWidth: 200,
            minWidth: 200
          })

          response.setHeader('Cache-Control', 'public, max-age=31536000')
          response.setHeader('Content-Type', 'image/jpeg')

          return new Promise((resolve, reject) => {
            imageStream
              .on('error', (error) => reject(error))
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
              message: `User profile image with the id ${id} does not exist`
            })
          }
        }
      })
    )

    // TODO BRN: Rework this to use busboy
    // router.post(
    //   '/api/v1/userprofileimage',
    //   asyncHandler(async (request, response) => {
    //     const { context } = request
    //     // const {  buffer, mimetype } = request.image
    //     // TODO BRN: Get access token from cookie header
    //     // Identify user based upon access token
    //     const user = null
    //     if (!user) {
    //       const error = new Error('Could not find user for the given access token')
    //       error.code = 'COULD_NOT_FIND_USER'
    //       throw error
    //     }
    //     const watThis = await findOrCreateUserProfileImageFromBuffer(context, {
    //       buffer,
    //       metadata: {
    //         contentType: mimetype
    //       },
    //       userId: user.id
    //     })
    //     return response.json({
    //       data: watThis,
    //       status: 'success',
    //       timestamp: Date.now() // System time is synced as close as possible with GPS time so this is as good as we get
    //     })
    //   })
    // )

    return router
  }
}

export default mod
