const sorterAlphabetical = (valueA, valueB) => {
  if (valueA < valueB) {
    return -1
  }
  if (valueA > valueB) {
    return 1
  }
  return 0
}

module.exports = sorterAlphabetical
