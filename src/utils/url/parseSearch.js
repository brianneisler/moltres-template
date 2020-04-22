import queryString from 'query-string'

const parseSearch = (search) => queryString.parse(search)

export default parseSearch
