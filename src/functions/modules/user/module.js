import { registerValidUser } from '../../../modules/auth'
import { getUserById } from '../../../modules/user'
import { findExistingUserByPhoneNumber } from '../../../modules/user_phone_number'
import { saveUserProfile } from '../../../modules/user_profile'
import { isId } from '../../../utils/db'
import { expected } from '../../../utils/error'
import { isValidPhoneNumber } from '../../../utils/phonenumber'

const mod = () => ({
  setupCliCommands: () => [
    {
      command: 'user [command]',
      description: 'administer users'
    },

    {
      command: 'user get',
      description: 'get a user',
      exec: async (context, cmd) => {
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

        logger.info(`User: ${JSON.stringify(user, null, 2)}`)
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
      command: 'user register',
      description: 'register a new user',
      exec: async (context, cmd) => {
        const { phoneNumber, userName } = cmd.opts()
        const { logger } = context
        const { user } = await registerValidUser(context, {
          phoneNumber
        })
        const userProfile = await saveUserProfile(context, {
          name: userName,
          userId: user.id
        })
        logger.info('USER CREATED')
        logger.info(JSON.stringify(user, null, 2))
        logger.info(JSON.stringify(userProfile, null, 2))
      },
      options: [
        {
          description: "The user's phone number",
          option: '-p, --phoneNumber [phoneNumber]',
          required: true
        },
        {
          description: "The user's name",
          option: '-n, --userName [userName]',
          required: true
        }
      ]
    }
  ]
})

export default mod
