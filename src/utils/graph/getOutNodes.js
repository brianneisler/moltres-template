import { map } from '../data'

const getOutNodes = (graph, node) => map((edge) => edge.w, graph.outEdges(node))

export default getOutNodes
