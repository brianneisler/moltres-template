import CryptoJS from 'crypto-js'

const hashString = (string, algorithm = 'SHA256') => CryptoJS[algorithm](string).toString()

export default hashString
