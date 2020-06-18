import { Object as _Object } from '../../../utils/lang/js'

const values = [
  _Object(0),
  _Object(-0),
  _Object(1),
  _Object(-1),
  _Object(1.1),
  _Object(-1.1),
  _Object(Infinity),
  _Object(-Infinity),
  _Object(NaN)
]

const numberObjects = () => values

export default numberObjects
