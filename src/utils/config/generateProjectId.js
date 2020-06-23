import { invariant, slice } from '../lang'

const generateProjectId = (config = {}) => {
  if (config.test) {
    invariant(config.test.runId, 'config.test.runId must be defined')
    if (config.test.integration) {
      invariant(
        process.env.FIREBASE_PROJECT_ID,
        'FIREBASE_PROJECT_ID must be defined when TEST_INTEGRATION is defined'
      )
      return process.env.FIREBASE_PROJECT_ID
    }
    // NOTE BRN: The max length of a project id is 30 characters
    return slice(0, 30, `test-${config.test.runId}`)
  }

  if (config.stage === 'local') {
    return 'local'
  }

  invariant(
    process.env.FIREBASE_PROJECT_ID,
    'FIREBASE_PROJECT_ID must be defined when STAGE is NOT "local"'
  )

  return process.env.FIREBASE_PROJECT_ID
}

export default generateProjectId
