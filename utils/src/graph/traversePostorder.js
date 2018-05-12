import { assoc, curry, forEach, has, pick, reduce } from 'ramda'
import getOutNodes from './getOutNodes'
import isGraph from './isGraph'

const newTraverseContext = (data) => pick([
  'graph',
  'results',
  'visited'
], data)

const traverseNode = (context, node, traverser) => {
  const { graph } = context
  let updatedContext = newTraverseContext({
    ...context,
    visited: assoc(node, true, context.visited)
  })
  const outNodes = getOutNodes(graph, node)
  forEach((outNode) => {
    if (!has(outNode, updatedContext.visited)) {
      updatedContext = traverseNode(updatedContext, outNode, traverser)
    }
  }, outNodes)
  const result = traverser(graph.node(node), node)
  return newTraverseContext({
    ...updatedContext,
    results: assoc(node, result, context.results)
  })
}

const traversePostorder = curry((traverser, graph) => {
  if (!isGraph(graph)) {
    throw new Error(`traversePostorder expects a Graph, instead received ${value}`)
  }
  const context = newTraverseContext({
    graph,
    visited: {},
    results: {}
  })
  return reduce(
    (ctx, source) => traverseNode(ctx, source, traverser),
    context,
    graph.sources()
  ).results
})

export default traversePostorder
