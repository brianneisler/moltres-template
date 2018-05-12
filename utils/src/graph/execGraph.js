import { all, props } from 'bluebird'
import { assoc, curry, map, prop } from 'ramda'
import getOutNodes from './getOutNodes'
import traversePostorder from './traversePostorder'

const execNode = async (graph, node, fn) => fn(graph.node(node), node)

const execGraph = curry(async (fn, graph) => {
  let promises = {}
  return props(traversePostorder(async (value, node) => {
    await all(map(
      (outNode) => prop(outNode, promises),
      getOutNodes(graph, node)
    ))
    const promise = execNode(graph, node)
    promises = assoc(node, promise, promises)
    return promise
  }, graph))
})

export default execGraph
