import { compose, withHandlers, withStateHandlers } from 'recompose'

const withModalControls = compose(
  withStateHandlers(
    ({ startOpen }) => ({
      modalVisible: startOpen
    }),
    {
      closeModal: () => () => ({
        modalVisible: false
      }),
      openModal: () => () => ({
        modalVisible: true
      }),
      toggleModal: ({ modalVisible }) => () => ({
        modalVisible: !modalVisible
      })
    }
  ),
  withHandlers({
    handleRequestClose: ({ closeModal }) => () => {
      closeModal()
    }
  })
)

export default withModalControls
