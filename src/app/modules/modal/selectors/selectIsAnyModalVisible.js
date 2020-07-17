import {
  any,
  createSelector,
  getProp,
  select,
  values
} from '../../../../utils/lang'

const selectIsAnyModalVisible = select(
  createSelector('modal.instances', (instances) =>
    any(getProp('visible'), values(instances))
  )
)

export default selectIsAnyModalVisible
