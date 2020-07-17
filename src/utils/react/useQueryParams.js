import { parseSearch } from '../url'

import useLocation from './useLocation'

const useQueryParams = () => parseSearch(useLocation().search)

export default useQueryParams
