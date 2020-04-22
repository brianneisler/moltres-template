import { v1 } from '@google-cloud/firestore'
import setupScriptContexts from './utils/setupScriptContexts'

const exec = async () => {
  const { adminContext } = await setupScriptContexts()
  const { config } = adminContext
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

  await client.exportDocuments({
    collectionIds: [],
    name,
    outputUriPrefix: `gs://${config.gcloud.databaseBackupBucket}`
  })

  process.exit()
}

exec().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
