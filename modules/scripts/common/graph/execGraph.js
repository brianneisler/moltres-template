const { all, props } = require('bluebird')
const { assoc, curry, map, prop } = require('ramda')
const getOutNodes = require('./getOutNodes')
const traversePostorder = require('./traversePostorder')

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

module.exports = execGraph
