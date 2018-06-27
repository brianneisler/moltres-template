import slice from './slice'

const castSlice = (array, start, end) => {
  const { length } = array
  end = end === undefined ? length : end
  return !start && end >= length ? array : slice(start, end, array)
}

export default castSlice
