import {
  ImmutableList,
  ImmutableMap,
  ImmutableOrderedMap,
  ImmutableOrderedSet,
  ImmutableSet,
  ImmutableStack,
  Seq
} from '../../../utils/lang/js'
import { keys, map } from 'ramda'

const valueMap = {
  ImmutableList: ImmutableList(),
  ImmutableMap: ImmutableMap(),
  ImmutableOrderedMap: ImmutableOrderedMap(),
  ImmutableOrderedSet: ImmutableOrderedSet(),
  ImmutableSet: ImmutableSet(),
  ImmutableStack: ImmutableStack(),
  Seq: Seq(),
  ['Seq.Indexed']: Seq.Indexed(),
  ['Seq.Keyed']: Seq.Keyed(),
  ['Seq.Set']: Seq.Set()
}

const immutables = (selected = keys(valueMap)) =>
  map((key) => valueMap[key], selected)

export default immutables
