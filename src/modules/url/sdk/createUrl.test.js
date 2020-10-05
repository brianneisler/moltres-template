import { getPoperty } from 'moltres'

import {
  setupTestAdminContext,
  setupTestServiceAccountContext,
  tearDownTestAdminContext,
  tearDownTestServiceAccountContext
} from '../../../test'
import { createHost, deleteHost } from '../../host'

import createUrl from './createUrl'
import deleteUrl from './deleteUrl'

const spec = describe('createUrl', () => {
  describe('ServiceAccount', () => {
    let adminContext
    let context
    let result
    let host
    beforeEach(async () => {
      adminContext = await setupTestAdminContext(spec)
      context = await setupTestServiceAccountContext(adminContext)
      host = await createHost(context, {
        domain: 'foo',
        subDomain: null,
        topLevelDomain: 'com'
      })
      result = null
    }, 20000)

    afterEach(async () => {
      try {
        if (result) {
          await deleteUrl(adminContext, getPoperty('id', result))
        }
      } catch (error) {
        context.logger.error(error)
      }
      try {
        if (result) {
          await deleteHost(adminContext, getPoperty('id', host))
        }
      } catch (error) {
        context.logger.error(error)
      }

      context = await tearDownTestServiceAccountContext(context)
      adminContext = await tearDownTestAdminContext(adminContext)
    }, 20000)

    test('can create a Url', async () => {
      const data = {
        hash: null,
        hostId: host.id,
        pathname: '/',
        port: null,
        protocol: 'https',
        search: null
      }
      result = await createUrl(context, data)
      expect(result).toEqual({
        createdAt: expect.any(context.firebase.firestore.Timestamp),
        hash: null,
        hostId: host.id,
        id: expect.stringMatching(/^[a-zA-Z0-9]{20}$/),
        pathname: '/',
        port: null,
        protocol: 'https',
        removedAt: null,
        search: null,
        updatedAt: expect.any(context.firebase.firestore.Timestamp)
      })
    })
  })
})
