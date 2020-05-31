import { compact, getProp, isEmpty, join, map, sortBy, values } from '../../../../../utils/data'

const renderProp = (value, prop) => {
  if (!value) {
    return null
  }
  if (value === true) {
    return prop
  }
  return `${prop}="${value}"`
}

const renderProps = (props) => {
  const scripts = compact(values(map(renderProp, props)))
  if (isEmpty(scripts)) {
    return ''
  }
  return ' ' + join(' ', scripts)
}

const renderContent = (content) => (content ? `\n${content}\n` : '')

const renderScripts = (context, scripts, data) =>
  join(
    '\n',
    map((script) => {
      if (script.create) {
        script = script.create(context, data)
      }
      if (script.props || script.content) {
        return `<script${renderProps(script.props)}>${renderContent(script.content)}</script>`
      }
      throw new Error(
        'renderScripts expects scripts to be an array of objects with at least a "props.src" or "content" property'
      )
    }, sortBy(getProp('priority'), scripts))
  )

export default renderScripts
