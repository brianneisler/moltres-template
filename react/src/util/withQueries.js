import {
  assoc,
  forEachObjIndexed,
  has,
  keys,
  mapObjIndexed,
  omit,
  prop,
  reduce
} from 'moltres-utils'
import { createFactory, Component } from 'react'
import { setDisplayName, shallowEqual, wrapDisplayName } from 'recompose'


const defaultMapQueriesToProps = () => ({})

const addListener = (listeners, key, query, listener) => {
  if (has(key, listeners)) {
    throw new Error(`listener already present for prop ${key}. Something must have gone wrong in withQueries`)
  }
  query.on('value', listener)
  return assoc(key, listener, listeners)
}

const removeListener = (listeners, key, query) => {
  const listener = prop(key, listeners)
  query.off('value', listener)
  return omit([ key ], listeners)
}

const withQueries = (mapQueriesToProps) => (BaseComponent) => {
  const mapQueries = mapQueriesToProps || defaultMapQueriesToProps
  const factory = createFactory(BaseComponent)

  class WithQueries extends Component {

    constructor(props, context) {
      super(props, context)
      this.state = {
        queryProps: {}
      }
    }

    componentDidMount() {
    //  console.log('componentDidMount - this.props:', this.props)

      this.queries = {}
      this.listeners = {}
      this.updateQueries(this.props)
    }

    componentWillUnmount() {
      this.removeListeners()
      this.queries = {}
    }

    componentWillReceiveProps(nextProps) {
      // console.log('componentWillReceiveProps - nextProps:', nextProps)
      if (!shallowEqual(nextProps, this.props)) {
        this.updateQueries(nextProps)
      }
    }

    updateQueries(props) {
      // console.log('updateQueries - props:', props)
      const mappedQueries = mapQueries({
        ...props,
        context: this
      })
      const { queries, state } = this
      let { listeners } = this
      let { queryProps } = state
      let remainingQueries = queries

      this.queries = mapObjIndexed((mappedQuery, key) => {
        const query = prop(key, queries)

        if (query !== mappedQuery) {
          if (query) {
            listeners = removeListener(listeners, key, query)
          }
          if (mappedQuery) {
            listeners = addListener(
              listeners,
              key,
              mappedQuery,
              (snapshot) => this.handleChange(snapshot, key)
            )
          }
          // TODO BRN: There is a bug here where the handleChange method
          // above gets fired when the listener is added. This causes
          // the state to be updated but it is then unset by the line below.
          // Best idea would be to rewrite the withQueries method to be
          // stateless

          // queryProps = assoc(key, null, queryProps)
        }
        remainingQueries = omit([ key ], remainingQueries)
        return mappedQuery
      }, mappedQueries)

      // These queires no longer exist in the props. We can drop them.
      forEachObjIndexed((remainingQuery, key) => {
        listeners = removeListener(listeners, key, remainingQuery)
        queryProps = omit([ key ], queryProps)
      }, remainingQueries)

      if (state.queryProps !== queryProps) {
        // console.log('updateQueries - updating queryProps:', queryProps)
        this.setState({ queryProps })
      }
      this.listeners = listeners
    }

    removeListeners() {
      const { listeners, queries } = this
      this.listeners = reduce((reduction, key) => {
        const query = prop(key, queries)
        return removeListener(reduction, key, query)
      }, keys(listeners))
    }

    handleChange(snapshot, key) {
      const value = snapshot.val()
      const { queryProps } = this.state
      // console.log('handleChange -  queryProps:', queryProps, ' value:', value)
      this.setState({
        queryProps: assoc(key, value, queryProps)
      })
    }

    render() {
      // console.log('render - this.state.queryProps:', this.state.queryProps)
      return factory({
        ...this.props,
        ...this.state.queryProps
      })
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withQueries'))(
      WithQueries
    )
  }
  return WithQueries
}

export default withQueries
