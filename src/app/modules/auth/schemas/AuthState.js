import { AuthState } from '../../../../constants'
import { String } from '../../../../core'
import { values } from '../../../../utils/data'

const AuthStateSchema = {
  name: 'auth.AuthState',
  schema: String.schema.valid(...values(AuthState))
}

export default AuthStateSchema
