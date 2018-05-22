const { map } = require('ramda')

const getOutNodes = (graph, node) =>
  map(
    (edge) => edge.w,
    graph.outEdges(node)
  )

module.exports = getOutNodes
