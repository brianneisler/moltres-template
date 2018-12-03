const rsAstralRange = '\\ud800-\\udfff'
const rsComboMarksRange = '\\u0300-\\u036f'
const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange = '\\u20d0-\\u20ff'
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange
const rsVarRange = '\\ufe0e\\ufe0f'
const rsZWJ = '\\u200d'
const reHasUnicode = RegExp(`[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`)

const hasUnicode = (string) => reHasUnicode.test(string)

export default hasUnicode
