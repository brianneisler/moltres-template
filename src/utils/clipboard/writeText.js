import { Clipboard } from 'react-native'

const writeText = async (text) => Clipboard.setString(text)

export default writeText
