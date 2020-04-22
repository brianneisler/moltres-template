import { v1 } from '@google-cloud/firestore'

const mod = {
  setupSchedule: (config) => ({
    'every 24 hours': async (context) => {
      const { logger } = context
      const { FirestoreAdminClient } = v1

      const credentials = {
        client_email: config.serviceAccount.client_email,
        private_key: config.serviceAccount.private_key
      }

      const client = new FirestoreAdminClient({
        credentials,
        projectId: config.firebase.projectId
      })

      const name = client.databasePath(config.firebase.projectId, '(default)')

      logger.info(
        `Backing up ${config.firebase.projectId} database to gs://${config.gcloud.databaseBackupBucket}...`
      )

      await client.exportDocuments({
        collectionIds: [],
        name,
        outputUriPrefix: `gs://${config.gcloud.databaseBackupBucket}`
      })
    }
  })
}

export default mod
