import { Clipboard } from 'react-native'

const readText = async () => Clipboard.getString()

export default readText
