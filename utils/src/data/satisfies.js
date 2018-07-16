import curry from './curry'

const satisfies = curry((protocol, value) => protocol.isSatisfied(value))

export default satisfies
