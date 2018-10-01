const doParallelIteration = (fn, iter) => {
  // TODO BRN
}

const iterateAll = (fn, collection) => doParallelIteration(fn, iterator(collection))

export default iterateAll
