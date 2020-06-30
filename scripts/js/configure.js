import { generateInternalPhoneNumber } from '../../src/sdk/phone_number'
import { map, split } from 'ramda'
import { setupScriptContexts } from './utils'

const configure = async () => {
  const { context, env } = await setupScriptContexts()
  const { logger } = context
  const { TWILIO_PHONE_NUMBERS } = env
  const internalPhoneNumbers = split(',', TWILIO_PHONE_NUMBERS)

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
