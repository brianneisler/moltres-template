const charCount = (str) => {
  const joiner = '\u{200D}'
  const split = str.split(joiner)
  let count = 0

  for (const char of split) {
    // removing the variation selectors
    const num = Array.from(char.split(/[\ufe00-\ufe0f]/).join('')).length
    count += num
  }

  // assuming the joiners are used appropriately
  return count / split.length
}

export default charCount
