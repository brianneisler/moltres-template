import { keys, map } from 'ramda'

const valueMap = {
  null: null,
  undefined
}
const nils = () => (selected = keys(valueMap)) =>
  map((key) => valueMap[key](), selected)

export default nils
