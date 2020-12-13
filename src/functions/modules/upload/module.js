import { withConfig, withContext } from 'moltres/core'
import { expected } from 'moltres/error'
import { compose, includes, pick, values } from 'moltres/lang'
import { handleAction } from 'moltres/redux'
import { deleteFile, downloadFile } from 'moltres/storage'

import { AllowedImageType, UploadState } from '../../../constants'
import { saveImageFromBuffer } from '../../../modules/image'
import { getUploadById, updateUpload } from '../../../modules/upload'
import { getUserById } from '../../../modules/user'
import { createUserImage } from '../../../modules/user_image'
import { takeEveryStorageObjectFinalize } from '../storage'

const ALLOWED_TYPES = values(AllowedImageType)

const isAllowedImageContentType = (contentType) =>
  includes(contentType, ALLOWED_TYPES)

const enhance = compose(
  withContext(),
  withConfig((config) => ({
    config
  }))
)

const mod = () => ({
  *run() {
    yield takeEveryStorageObjectFinalize(
      {
        path: 'uploads/:userId/:uploadId/:uploadName'
      },
      handleAction(
        enhance(function* (context, action, { match }) {
          // eslint-disable-next-line no-console
          console.log('action:', action)
          // eslint-disable-next-line no-console
          console.log('match:', match)

          const { uploadId, uploadName, userId } = match

          let upload
          let user
          try {
            // - Move file to images folder is storage
            // - Create an Image record
            // - Create UserImage record
            // - Set UserImage.id on the Upload meta data
            // - Set Upload status to COMPLETE
            ;[upload, user] = yield Promise.all([
              getUploadById(context, uploadId),
              getUserById(context, userId)
            ])
            yield updateUpload(context, uploadId, {
              state: UploadState.POST_PROCESSING
            })
            if (!isAllowedImageContentType(action.payload.contentType)) {
              throw expected({
                code: 'CONTENT_TYPE_NOT_ALLOWED',
                message: `Upload of type '${action.payload.contentType}' not allowed`
              })
            }

            const fileBuffer = yield downloadFile(context, action.payload.name)
            const image = yield saveImageFromBuffer(context, fileBuffer)
            const userImage = yield createUserImage(context, {
              imageId: image.id,
              userId: user.id
            })
            yield updateUpload(context, uploadId, {
              meta: {
                imageId: image.id,
                userImageId: userImage.id
              },
              state: UploadState.COMPLETED
            })
          } catch (error) {
            context.logger.error(
              `Error on Upload:/${userId}/${uploadId}/${uploadName}`
            )
            context.logger.error(error)
            if (upload) {
              yield updateUpload(context, uploadId, {
                error: pick(['code', 'message'], error),
                state: UploadState.ERROR
              })
            }
          } finally {
            yield deleteFile(context, action.payload.name)
          }
        })
      )
    )
  }
})

export default mod
