import { map } from '../lang'

const getOutNodes = (graph, node) => map((edge) => edge.w, graph.outEdges(node))

export default getOutNodes
