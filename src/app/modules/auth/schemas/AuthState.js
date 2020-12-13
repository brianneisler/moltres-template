import { AuthState } from '../../../../constants'
import { String } from 'moltres/core'
import { values } from 'moltres/lang'

const AuthStateSchema = {
  name: 'auth.AuthState',
  schema: String.schema.valid(...values(AuthState))
}

export default AuthStateSchema
