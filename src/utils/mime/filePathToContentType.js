import { lookup } from 'mime-types'

const filePathToContentType = (filePath) => lookup(filePath)

export default filePathToContentType
