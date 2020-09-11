import { v1 } from '@google-cloud/firestore'

import { FirestoreConfig } from './schemas'

const mod = () => ({
  setupSchedule: () => ({
    'every 24 hours': async (context) => {
      const { config, logger } = context
      const { FirestoreAdminClient } = v1

      const credentials = {
        client_email: config.firebase.serviceAccount.client_email,
        private_key: config.firebase.serviceAccount.private_key
      }

      const client = new FirestoreAdminClient({
        credentials,
        projectId: config.firebase.projectId
      })

      const name = client.databasePath(config.firebase.projectId, '(default)')

      logger.info(
        `Backing up ${config.firebase.projectId} database to gs://${config.firestpre.backupBucket}...`
      )

      await client.exportDocuments({
        collectionIds: [],
        name,
        outputUriPrefix: `gs://${config.firestore.backupBucket}`
      })
    }
  })
})

mod.configSchema = FirestoreConfig

export default mod
