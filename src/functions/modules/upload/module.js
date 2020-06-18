import { AllowedImageType, UploadState } from '../../../constants'
import { compose, includes, pick, values } from '../../../utils/lang'
import { createUserImage } from '../../../db/UserImage'
import { deleteFile, downloadFile } from '../../../utils/storage'
import { expected } from '../../../utils/error'
import { getUploadById, updateUpload } from '../../../db/Upload'
import { getUserById } from '../../../db/User'
import { handleAction } from '../../../utils/redux'
import { saveImageFromBuffer } from '../../../service/image'
import { takeEveryStorageObjectFinalize } from '../storage'
import { withConfig, withContext } from '../../../core'

const ALLOWED_TYPES = values(AllowedImageType)

const isAllowedImageContentType = (contentType) =>
  includes(contentType, ALLOWED_TYPES)

const enhance = compose(
  withContext(),
  withConfig((config) => ({
    config
  }))
)

const mod = {
  run: function* run() {
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
              state: UploadState.COMPLETE
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
}

export default mod
