import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../test'
import { copyBufferToUint8Array, createBuffer } from '../buffer'

import downloadFile from './downloadFile'

const TEST_IMAGE_BUFFER = createBuffer(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
)

// 1px PNG base64 encoded
const TEST_IMAGE = copyBufferToUint8Array(TEST_IMAGE_BUFFER)

const spec = describe('downloadFile', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let bucket
    let file

    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      bucket = context.storage.bucket()
      file = bucket.file(`test/${context.config.test.runId}/foo.png`)
      await file.save(TEST_IMAGE)
    }, 20000)

    afterEach(async () => {
      await file.delete()
      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    it('Can download a file', async () => {
      const buffer = await downloadFile(
        context,
        `test/${context.config.test.runId}/foo.png`
      )
      expect(buffer).toEqual(TEST_IMAGE_BUFFER)
    }, 20000)
  })
})
