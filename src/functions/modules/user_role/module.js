import { isId } from 'moltres/db'
import { expected } from 'moltres/error'
import { isValidPhoneNumber } from 'moltres/phone_number'

import { createRole } from '../../../modules/role'
import { ADMIN, HIL } from '../../../modules/role/constants/RoleValues'
import { getUserById } from '../../../modules/user'
import { findExistingUserByPhoneNumber } from '../../../modules/user_phone_number'
import { createUserRole } from '../../../modules/user_role'

const mod = () => ({
  setupCliCommands: () => [
    {
      command: 'user role',
      description: "set a user's role",
      exec: async (context, cmd) => {
        const { role, userId } = cmd.opts()
        const { logger } = context
        let user
        if (![ADMIN, HIL].includes(role)) {
          throw expected({
            message: `$role is not allowed as a user role`
          })
        }

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

        const userRole = await createUserRole(context, {
          userId: user.id
        })
        logger.info('USER ROLE CREATED')
        logger.info(JSON.stringify(userRole, null, 2))

        const roleEntity = await createRole(context, {
          userId: user.id,
          roleName: role
        })
        logger.info('ROLE CREATED')
        logger.info(JSON.stringify(roleEntity, null, 2))
      },
      options: [
        {
          description: "The user's id or phone number",
          option: '-u, --userId [userId]',
          required: true
        },
        {
          description: "The user's role",
          option: '-r, --role [role]',
          required: true
        }
      ]
    }
  ]
})

export default mod
