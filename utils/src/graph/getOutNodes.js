import { map } from 'ramda'

const getOutNodes = (graph, node) => map((edge) => edge.w, graph.outEdges(node))

export default getOutNodes
