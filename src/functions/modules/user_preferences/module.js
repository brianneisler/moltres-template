import { isId } from 'moltres/db'
import { expected } from 'moltres/error'
import { isValidPhoneNumber } from 'moltres/phone_number'

import {
  findAllPreferencesByUserPreferencesId,
  findPreferenceById,
  removePreference,
  setPreference
} from '../../../modules/preference'
import { getUserById } from '../../../modules/user'
import { findExistingUserByPhoneNumber } from '../../../modules/user_phone_number'
import {
  findOrCreateUserPreferences,
  findUserPreferencesById
} from '../../../modules/user_preferences'

const mod = () => ({
  setupCliCommands: () => [
    {
      command: 'user preferences [command]',
      description: 'administer user preferences'
    },

    {
      command: 'user preferences delete <key>',
      description: 'delete a user preference value',
      exec: async (context, key, cmd) => {
        const { userId } = cmd.opts()
        const { logger } = context

        let user
        if (isId(userId)) {
          user = await getUserById(context, userId)
        } else if (isValidPhoneNumber(userId)) {
          user = await findExistingUserByPhoneNumber(context, userId)
        } else {
          throw expected({
            message: `Given userId must be either an id or a phone number`
          })
        }

        if (!user) {
          throw expected({
            message: `User with the id ${userId} does not exist`
          })
        }

        const userPreferences = await findUserPreferencesById(context, user.id)
        if (!userPreferences) {
          throw expected({
            message: `No UserPreferences exist for the User with id ${userId}`
          })
        }

        const preference = await removePreference(context, [
          userPreferences.id,
          key
        ])
        logger.info(
          `Preference ${key}: ${JSON.stringify(preference.value, null, 2)}`
        )
      },
      options: [
        {
          description: "The user's id or phone number",
          option: '-u, --userId [userId]',
          required: true
        }
      ]
    },

    {
      command: 'user preferences get [key]',
      description: 'get a user preference value',
      exec: async (context, key, cmd) => {
        const { userId } = cmd.opts()
        const { logger } = context

        let user
        if (isId(userId)) {
          user = await getUserById(context, userId)
        } else if (isValidPhoneNumber(userId)) {
          user = await findExistingUserByPhoneNumber(context, userId)
        } else {
          throw expected({
            message: `Given userId must be either an id or a phone number`
          })
        }

        if (!user) {
          throw expected({
            message: `User with the id ${userId} does not exist`
          })
        }

        const userPreferences = await findUserPreferencesById(context, user.id)
        if (!userPreferences) {
          throw expected({
            message: `No UserPreferences exist for the User with id ${userId}`
          })
        }

        if (!key) {
          const preferences = await findAllPreferencesByUserPreferencesId(
            context,
            userPreferences.id
          )
          logger.info(
            `All Preferences for User ${userId}:]n ${JSON.stringify(
              preferences,
              null,
              2
            )}`
          )
        } else {
          const preference = await findPreferenceById(context, [
            userPreferences.id,
            key
          ])
          logger.info(
            `Preference ${key}: ${JSON.stringify(preference.value, null, 2)}`
          )
        }
      },
      options: [
        {
          description: "The user's id or phone number",
          option: '-u, --userId [userId]',
          required: true
        }
      ]
    },

    {
      command: 'user preferences set <key> <value>',
      description: 'get a user preference value',
      exec: async (context, key, value, cmd) => {
        const { userId } = cmd.opts()
        const { logger } = context
        if (!key) {
          throw new expected({
            message: 'key argument must be specified'
          })
        }

        let user
        if (isId(userId)) {
          user = await getUserById(context, userId)
        } else if (isValidPhoneNumber(userId)) {
          user = await findExistingUserByPhoneNumber(context, userId)
        } else {
          throw expected({
            message: `Given userId must be either an id or a phone number`
          })
        }

        if (!user) {
          throw expected({
            message: `User with the id ${userId} does not exist`
          })
        }

        const userPreferences = await findOrCreateUserPreferences(context, {
          userId: user.id
        })
        await setPreference(context, [userPreferences.id, key], {
          key,
          userPreferencesId: userPreferences.id,
          value
        })

        logger.info(`Preference '${key}' set `)
      },
      options: [
        {
          description: "The user's id or phone number",
          option: '-u, --userId [userId]',
          required: true
        }
      ]
    }
  ]
})

export default mod
