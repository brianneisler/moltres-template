import { Colors, StyleSheet, Styles } from '../../styles'

const styleSheet = StyleSheet.create({
  activityIndicatorOverlay: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  button: {
    borderRadius: 4,
    height: 24
  },
  buttonDefault: {
    backgroundColor: Colors.primaryWhite
  },
  buttonDestructive: {
    backgroundColor: Colors.warn
  },
  buttonDisabled: {
    backgroundColor: Colors.grey3,
    borderColor: Colors.grey5
  },
  buttonPositive: {
    backgroundColor: Colors.blue6
  },
  buttonText: {
    ...Styles.textMedium,
    color: Colors.whitePrimary,
    fontWeight: '600',
    padding: 8,
    textAlign: 'center'
  },
  buttonTextDisabled: {
    color: Colors.grey6
  }
})

export default styleSheet
