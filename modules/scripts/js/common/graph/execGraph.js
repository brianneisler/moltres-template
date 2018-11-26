import { all, props } from 'bluebird'
import { assoc, curry, map, prop } from 'ramda'
import getOutNodes from './getOutNodes'
import traversePostorder from './traversePostorder'

const execGraph = curry(async (fn, graph) => {
  let promises = {}
  const execNode = async (graph, node, fn) => {
    const foundPromises = map(
      (outNode) => prop(outNode, promises),
      getOutNodes(graph, node)
    )
    await all(foundPromises)
    return fn(graph.node(node), node)
  }

  traversePostorder((value, node) => {
    const promise = execNode(graph, node, fn)
    promises = assoc(node, promise, promises)
  }, graph)

  return props(promises)
})

export default execGraph
