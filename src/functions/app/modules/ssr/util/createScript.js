import { invariant } from '../../../../../utils/redux'

const PRIORITY_DEFAULT = 100

const createScript = ({ content, priority = PRIORITY_DEFAULT, props = {} }) => {
  invariant(
    !(props.src && content),
    'A script should only specify either "src" or "content", not both'
  )
  return {
    content,
    priority,
    props: {
      type: 'text/javascript',
      ...props
    }
  }
}

export default createScript
