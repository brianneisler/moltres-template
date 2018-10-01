import map from '../data/map'

const getOutNodes = (graph, node) => map((edge) => edge.w, graph.outEdges(node))

export default getOutNodes
