import { withConfig, withContext } from '../../../../core'
import { compose } from '../../../../utils/lang'
import { handleAction, pipe, takeEvery } from '../../../../utils/redux'
import { createWindowChannel } from '../../../../utils/web'
import { WidgetReadyAction } from '../../../app/modules/widget/schemas'

const enhance = compose(withConfig(), withContext())

const mod = () => ({
  *run() {
    const windowChannel = createWindowChannel()
    yield pipe(windowChannel)

    yield takeEvery(
      WidgetReadyAction.name,
      handleAction(
        enhance(function* (context, action) {
          // eslint-disable-next-line no-console
          console.log('widget ready action received - action:', action)
        })
      )
    )
  }
})

export default mod
