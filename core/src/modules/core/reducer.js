import data from '../../../package.json'
import handleActions from '../../handleActions'

const reducer = handleActions({

}, {
  version: data.version
})

export default reducer
