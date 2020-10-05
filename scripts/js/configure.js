import { map } from 'moltres'

import { generateInternalPhoneNumber } from '../../src/modules/phone_number'

import { setupScriptContexts } from './utils'

const configure = async () => {
  const { context } = await setupScriptContexts()
  const { config, logger } = context
  const internalPhoneNumbers = config.twilio.phoneNumbers

  logger.info('Saving internal phone numbers')
  await Promise.all(
    map(
      async (phoneNumber) =>
        generateInternalPhoneNumber(context, { phoneNumber }),
      internalPhoneNumbers
    )
  )

  logger.info('Internal phone numbers saved')
  process.exit()
}

configure().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
