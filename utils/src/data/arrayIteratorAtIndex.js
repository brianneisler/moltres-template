const arrayIteratorAtIndex = (value, index = 0) => {
  return {
    next: () => {
      if (index < value.length) {
        const next = {
          value: value[index],
          index,
          kdx: index,
          done: false
        }
        index += 1
        return next
      }
      return {
        done: true
      }
    }
  }
}

export default arrayIteratorAtIndex
