import { all, props } from 'bluebird'

import { assoc, curry, getProperty, map } from '../lang'

import getOutNodes from './getOutNodes'
import traversePostorder from './traversePostorder'

const execGraph = curry(async (fn, graph) => {
  let promises = {}
  const execNode = async (nodeGraph, node, nodeFn) => {
    const foundPromises = map(
      (outNode) => getProperty(outNode, promises),
      getOutNodes(nodeGraph, node)
    )
    await all(foundPromises)
    return nodeFn(nodeGraph.node(node), node)
  }

  traversePostorder((value, node) => {
    const promise = execNode(graph, node, fn)
    promises = assoc(node, promise, promises)
  }, graph)

  return props(promises)
})

export default execGraph
