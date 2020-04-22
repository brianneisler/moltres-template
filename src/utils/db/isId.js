const ID_REGEX = /^[a-zA-Z0-9]{20}$/

const isId = (value) => value.match(ID_REGEX)

export default isId
