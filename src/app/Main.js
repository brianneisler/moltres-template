import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLaughSquint,
  faPaperPlane
} from '@fortawesome/free-regular-svg-icons'
import {
  faBars,
  faBell,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
  faHome,
  faImage,
  faPlusSquare,
  faRecycle,
  faTimes,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { InteractionManager, StyleSheet } from 'react-native'

import { Scroll } from '../constants'
import { selectAppConfig } from '../core'
import { selectSSRConfig } from '../core/selectors'
import { compose, getProperty } from '../utils/lang'
import {
  connect,
  defaultProps,
  lifecycle,
  setDisplayName,
  withActions,
  withHandlers,
  withProps
} from '../utils/react'

import {
  ActionSheet,
  Alert,
  AnimatedSwitch,
  Link,
  Route,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from './components'
import HeaderTopLeftNav from './components/HeaderTopLeftNav/HeaderTopLeftNav'
import HeaderTopRightNav from './components/HeaderTopRightNav/HeaderTopRightNav'
import MainNav from './components/MainNav/MainNav'
import { selectCurrentActionSheet } from './modules/action_sheet'
import { selectCurrentAlert } from './modules/alert'
import { selectDimensionsWindowHeight } from './modules/dimensions'
import { pushRouteAction } from './modules/router/actions'
import {
  actions as scrollActions,
  selectScrollTargetIsAtTop
} from './modules/scroll'
import { uiDeinitializedAction, uiInitializedAction } from './modules/ui'
import {
  HomePage,
  LoginCodePage,
  LoginPage,
  LogoutPage,
  MenuPage,
  NotFound404Page,
  NotificationsPage,
  PrivacyPage,
  TermsPage,
  UserProfilePage
} from './pages'
import { Colors, Fonts, Styles } from './styles'

library.add(
  faBars,
  faBell,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
  faHome,
  faImage,
  faLaughSquint,
  faPaperPlane,
  faPlusSquare,
  faRecycle,
  faTimes,
  faTrashAlt
)

const enhance = compose(
  setDisplayName('Main'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        appContainer: {
          backgroundColor: Colors.backgroundPrimary,
          display: 'inline-flex',
          minHeight: '100%',
          position: 'absolute',
          top: 0,
          width: '100%'
        },
        body: {
          alignItems: 'flex-start',
          display: 'flex',
          marginBottom: 10,
          marginTop: 2,
          width: '100%'
        },
        footer: {
          backgroundColor: Colors.whitePrimary,
          bottom: -28,
          display: 'flex',
          flex: 0,
          height: 90,
          position: 'sticky',
          shadowColor: '#000',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 1,
          width: '100%'
        },
        footerBottom: {
          marginBottom: 10,
          padding: 0
        },
        footerText: {
          color: Colors.blackPrimary,
          fontFamily: Fonts.primaryFontFamily,
          fontSize: 10,
          paddingLeft: 10,
          paddingRight: 10,
          textAlign: 'center'
        },
        footerTop: {
          marginBottom: 12,
          padding: 0
        },
        header: {
          alignItems: 'center',
          backgroundColor: Colors.bluePrimary,
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center'
        },
        headerCenter: {
          alignItems: 'center',
          flex: 1,
          height: '100%',
          paddingTop: 0
        },
        headerContainer: {
          display: 'flex',
          flex: 0,
          height: 100,
          position: 'sticky',
          shadowColor: '#000',
          shadowOffset: { height: 1, width: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 1,
          top: -50,
          width: '100%',
          zIndex: 1
        },
        headerItem: {
          marginBottom: 8
        },
        headerLeft: {
          alignItems: 'center',
          height: '100%',
          justifyContent: 'flex-end',
          width: 100
        },
        headerRight: {
          alignItems: 'center',
          height: '100%',
          justifyContent: 'flex-end',
          width: 100
        },
        headerTitle: {
          color: Colors.whitePrimary,
          fontFamily: Fonts.primaryFontFamily,
          fontSize: 30,
          fontWeight: 'bold',
          paddingTop: 18,
          textDecorationLine: 'none'
        },
        innerContainer: {
          flex: 1,
          flexDirection: 'column'
        },
        statusContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 101,
          width: '100%',
          zIndex: -1
        }
      })
    }
  }),
  withActions({
    pushRoute: pushRouteAction,
    scrollTo: scrollActions.scrollTo,
    uiDeinitialized: uiDeinitializedAction,
    uiInitialized: uiInitializedAction
  }),
  connect((state) => ({
    app: selectAppConfig(state),
    currentActionSheet: selectCurrentActionSheet(state),
    currentAlert: selectCurrentAlert(state),
    scrollIsAtTop: selectScrollTargetIsAtTop('window', state),
    ssr: selectSSRConfig(state),
    windowHeight: selectDimensionsWindowHeight(state)
  })),
  withProps(({ windowHeight }) => ({ minHeight: windowHeight })),
  withHandlers({
    handleTitlePress: ({ pushRoute, scrollIsAtTop, scrollTo }) => () => {
      // TODO BRN: We can add custom code to navigate based on title click here
      // for when we add the ability to change the title to a custom value
      if (scrollIsAtTop) {
        pushRoute('/')
      } else {
        scrollTo({
          behavior: 'smooth',
          left: 0,
          name: 'window',
          top: Scroll.PAGE_TOP
        })
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      InteractionManager.runAfterInteractions(() => {
        this.props.uiInitialized()
      })
    },
    componentWillUnmount() {
      this.props.uiDeinitialized()
    }
  })
)

let first = true
const Main = enhance(
  ({
    app,
    currentActionSheet,
    currentAlert,
    handleTitlePress,
    minHeight,
    ssr,
    styles
  }) => {
    const result = (
      <View style={styles.fillContainer}>
        {!ssr && !first ? <ActionSheet {...currentActionSheet} /> : null}
        {!ssr && !first ? <Alert {...currentAlert} /> : null}
        <View style={styles.appContainer}>
          <View style={[styles.headerContainer]}>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <HeaderTopLeftNav style={styles.headerItem} />
              </View>
              <View style={styles.headerCenter}>
                <Link style={StyleSheet.flatten([styles.link])} to="/">
                  {'TODO Add icon config'}
                </Link>
                <TouchableOpacity onPress={handleTitlePress}>
                  <Text style={styles.headerTitle}>
                    {getProperty('name', app)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headerRight}>
                <HeaderTopRightNav style={styles.headerItem} />
              </View>
            </View>
            <StatusBar style={styles.statusContainer} />
          </View>
          <View style={[styles.inlineContainer, styles.body, { minHeight }]}>
            <AnimatedSwitch
              animationType={'slide'}
              // location={location}
            >
              <Route component={HomePage} exact path="/" />
              <Route component={PrivacyPage} exact path="/legal/privacy" />
              <Route component={TermsPage} exact path="/legal/terms" />
              <Route component={LoginCodePage} exact path="/login/code" />
              <Route component={LoginPage} exact path="/login" />
              <Route component={LogoutPage} exact path="/logout" />
              <Route component={MenuPage} exact path="/menu" />
              <Route
                component={NotificationsPage}
                exact
                path="/notifications"
              />
              <Route
                path="/user/:userId/:tab?"
                render={({ match }) => (
                  <UserProfilePage
                    tab={match.params.tab}
                    userId={match.params.userId}
                  />
                )}
              />
              <Route component={NotFound404Page} />
            </AnimatedSwitch>
          </View>
          <View style={[styles.inlineContainer, styles.footer]}>
            <View style={styles.block}>
              <View style={[styles.inlineBlock, styles.footerTop]}>
                <MainNav />
              </View>
              <View style={[styles.inlineBlock, styles.footerBottom]}>
                <Link
                  style={StyleSheet.flatten([styles.link])}
                  to="/legal/terms"
                >
                  <Text style={styles.footerText}>Terms</Text>
                </Link>
                <Link
                  style={StyleSheet.flatten([styles.link])}
                  to="/legal/privacy"
                >
                  <Text style={styles.footerText}>Privacy</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
    first = false
    return result
  }
)

export default Main
