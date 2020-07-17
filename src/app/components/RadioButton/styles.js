import { Colors, StyleSheet } from '../../styles'

const styleSheet = StyleSheet.create({
  disabledRadioButton: {
    backgroundColor: Colors.grey60,
    borderColor: Colors.grey50
  },
  hoveredRadioButton: {
    borderColor: Colors.grey30
  },
  innerRadioButton: {
    borderRadius: 8 / 2,
    height: 8,
    width: 8
  },
  radioButton: {
    alignItems: 'center',
    borderColor: Colors.grey40,
    borderRadius: 16 / 2,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 16,
    justifyContent: 'center',
    width: 16
  },
  selectedDisabledInnerRadioButton: {
    backgroundColor: Colors.grey60
  },
  selectedHoveredInnerRadioButton: {
    backgroundColor: Colors.blue70
  },
  selectedHoveredRadioButton: {
    borderColor: Colors.blue70
  },
  selectedInnerRadioButton: {
    backgroundColor: Colors.blue60
  },
  selectedRadioButton: {
    borderColor: Colors.blue60
  }
})

export default styleSheet
