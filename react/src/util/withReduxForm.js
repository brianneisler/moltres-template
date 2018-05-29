import { compose, setDisplayName, withProps, wrapDisplayName } from 'recompose'
import { reduxForm } from 'redux-form'

const defaultMapProps = (props) => props

const withReduxForm = (initialState, mapProps = defaultMapProps) => {
  const hoc = compose(
    withProps((props) => ({
      ...props,
      ...mapProps(props)
    })),
    reduxForm(initialState)
  )
  if (process.env.NODE_ENV !== 'production') {
    return (BaseComponent) =>
      setDisplayName(wrapDisplayName(BaseComponent, 'withReduxForm'))(
        hoc(BaseComponent)
      )
  }
  return hoc
}

export default withReduxForm
