import Immutable from 'immutable'
import installDevTools from 'immutable-devtools'

export default () => {
  installDevTools(Immutable)
}
