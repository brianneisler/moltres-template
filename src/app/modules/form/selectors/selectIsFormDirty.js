import { isDirty } from 'redux-form'

import { curry } from '../../../../utils/lang'

const selectIsFormDirty = curry((formName, state) => isDirty(formName)(state))

export default selectIsFormDirty
