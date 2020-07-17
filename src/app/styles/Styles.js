import { StyleSheet } from 'react-native'
import Colors from './Colors'
import Fonts from './Fonts'

const Styles = StyleSheet.create({
  activityIndicator: {
    padding: 20,
    width: 60
  },
  alignItemsEnd: {
    alignItems: 'flex-end'
  },
  alignItemsStart: {
    alignItems: 'flex-start'
  },
  alignSelfEnd: {
    alignSelf: 'flex-end'
  },
  alignSelfStart: {
    alignSelf: 'flex-start'
  },
  block: {
    backgroundColor: Colors.whitePrimary,
    flexDirection: 'column',
    padding: 0,
    width: '100%'
  },
  blockContainer: {
    backgroundColor: Colors.backgroundPrimary,
    display: 'block',
    width: '100%'
  },
  button: {
    backgroundColor: Colors.whitePrimary,
    borderColor: Colors.blackPrimary,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
    width: '100%'
  },
  buttonText: {
    color: Colors.blackPrimary,
    fontFamily: Fonts.primaryFontFamily,
    marginLeft: 7,
    marginRight: 7,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  dangerText: {
    color: Colors.redPrimary,
    fontFamily: Fonts.primaryFontFamily
  },
  disabled: {
    opacity: 0.2
  },
  enabled: {
    opacity: 1
  },
  errorText: {
    color: Colors.redPrimary,
    fontFamily: Fonts.primaryFontFamily
  },
  field: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  fieldStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  fillContainer: {
    alignItems: 'stretch',
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  hidden: {
    display: 'none'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.70)',
    fontSize: 20
  },
  iconText: {
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 20
  },
  inline: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  inlineBlock: {
    alignItems: 'center',
    backgroundColor: Colors.whitePrimary,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    width: '100%'
  },
  inlineCenter: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inlineContainer: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  justifyContentEnd: {
    justifyContent: 'flex-end'
  },
  justifyContentStart: {
    justifyContent: 'flex-start'
  },
  // NOTE BRN: justifySelf is not yet supported by ReactNative
  // justifyEnd: {
  //   justifySelf: 'flex-end'
  // },
  // justifyStart: {
  //   justifySelf: 'flex-start'
  // },
  label: {
    color: Colors.blackPrimary,
    fontFamily: Fonts.primaryFontFamily
  },
  link: {
    textDecorationLine: 'none'
  },
  linkText: {
    color: Colors.bluePrimary,
    fontFamily: Fonts.primaryFontFamily
  },
  list: {
    width: '100%'
  },
  mediumText: {
    color: Colors.blackPrimary,
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 20
  },
  overlay: {
    backgroundColor: Colors.blackPrimary,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    position: 'absolute',
    right: 0,
    top: 0
  },
  ownerBlock: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'center',
    paddingLeft: 5
  },
  ownerImage: {
    // paddingLeft: 5
  },
  ownerNameText: {
    color: Colors.blackPrimary,
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 13,
    paddingLeft: 5
  },
  paddedBlock: {
    backgroundColor: Colors.whitePrimary,
    flexDirection: 'column',
    padding: 10,
    width: '100%'
  },
  page: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%'
  },
  pushToEnd: {
    marginLeft: 'auto'
  },
  scroll: {
    alignItems: 'center',
    width: '100%'
  },
  section: {
    alignItems: 'center',
    backgroundColor: Colors.whitePrimary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  smallProfileImage: {
    margin: 8
  },
  statusText: {
    color: Colors.whitePrimary,
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 18
  },
  submitText: {
    color: Colors.bluePrimary,
    flex: 1,
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },
  submitedText: {
    color: Colors.greenPrimary,
    flex: 1,
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },
  tab: {
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 24,
    paddingRight: 24
  },
  tabSelected: {
    borderBottomColor: Colors.bluePrimary,
    borderBottomStyle: 'solid',
    borderBottomWidth: 2
  },
  tabSelectedText: {
    color: Colors.bluePrimary
  },
  tabText: {
    color: Colors.blackTertiary,
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 20
  },
  tabs: {
    borderBottomColor: Colors.blackTertiary,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%'
  },
  tabsSticky: {
    backgroundColor: Colors.backgroundPrimary,
    position: 'sticky',
    top: 50,
    zIndex: 1
  },
  text: {
    color: Colors.blackPrimary,
    fontFamily: Fonts.primaryFontFamily,
    fontSize: 14
  },
  textInput: {
    backgroundColor: Colors.whitePrimary,
    borderRadius: 4,
    color: Colors.blackPrimary,
    fontFamily: Fonts.primaryFontFamily,
    padding: 5,
    shadowColor: Colors.blackPrimary,
    shadowOffset: { height: -1, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    width: '100%'
  },
  warningText: {
    color: Colors.blackPrimary,
    fontFamily: Fonts.primaryFontFamily
  },
  whiteButton: {
    borderColor: Colors.whitePrimary,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 30,
    textAlign: 'center',
    width: 60
  },
  whiteButtonText: {
    color: Colors.whitePrimary,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 30
  },
  wrapText: {
    flexWrap: 'wrap'
  }
})

export default Styles
