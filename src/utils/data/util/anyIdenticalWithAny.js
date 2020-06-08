const anyIdenticalWithAny = (anyA, anyB) => {
  // SameValue algorithm
  if (anyA === anyB) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return anyA !== 0 || anyB !== 0 || 1 / anyA === 1 / anyB
  }
  // Step 6.a: NaN == NaN
  return anyA !== anyA && anyB !== anyB
}

export default anyIdenticalWithAny
