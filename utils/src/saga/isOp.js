const isOp = (value) => !!(value && value['@@redux-saga/IO'])

export default isOp
