import {
  FieldTextInput,
  Fragment,
  MetaTags,
  Text,
  TouchableOpacity,
  View
} from '../../components'
import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { SubmissionError, validatePhoneNumber } from '../../../utils/form'
import { actions as authSMSActions } from '../../modules/auth_sms'
import { buildLocation } from '../../../utils/url'
import { compose } from '../../../utils/data'
import {
  connect,
  defaultProps,
  setDisplayName,
  withActions,
  withHandlers,
  withProps,
  withReduxForm
} from '../../../utils/react'
import { pushRouteAction } from '../../modules/router/actions'
import { selectAfterLogin, selectAuthState } from '../../modules/auth'
import { selectAppConfig } from '../../modules/app'
import { selectFacebookConfig } from '../../modules/facebook'
import { selectSSRConfig } from '../../../core'
import { selectTwitterConfig } from '../../modules/twitter'

import React from 'react'

const LOGIN_SMS_FORM = 'loginSMSForm'

const enhance = compose(
  setDisplayName('LoginPage'),
  defaultProps({
    styles: {
      ...Styles,
      ...StyleSheet.create({
        form: {
          maxWidth: 400,
          padding: 15,
          width: '100%'
        },
        textInputStyle: {
          marginBottom: 10,
          marginTop: 10
        }
      })
    }
  }),
  withActions({
    pushRoute: pushRouteAction,
    requestSMSChallenge: authSMSActions.requestSMSChallenge
  }),
  connect((state) => ({
    afterLogin: selectAfterLogin(state),
    app: selectAppConfig(state),
    authState: selectAuthState(state),
    facebook: selectFacebookConfig(state),
    ssr: selectSSRConfig(state),
    twitter: selectTwitterConfig(state)
  })),
  withProps(({ app }) => {
    const description = `Login`
    return {
      description,
      title: `${description} - ${app.name}`
    }
  }),
  withReduxForm(
    {
      form: LOGIN_SMS_FORM
    },
    ({ afterLogin, pushRoute, requestSMSChallenge }) => ({
      onSubmit: ({ phoneNumber }) =>
        requestSMSChallenge(phoneNumber)
          .then(() => {
            if (afterLogin) {
              return pushRoute(
                buildLocation({
                  pathname: '/login/code',
                  query: {
                    afterLogin
                  }
                })
              )
            }
            return pushRoute('/login/code')
          })
          .catch((error) => {
            throw new SubmissionError({ phoneNumber: error.message })
          })
    })
  ),
  withHandlers({
    handleButtonPress: ({ submit }) => () => submit()
  })
)

const LoginPage = enhance(
  ({
    app,
    description,
    facebook,
    handleButtonPress,
    ssr,
    styles,
    submitting,
    title,
    twitter
  }) => {
    const disabled = submitting
    return (
      <View style={styles.page}>
        <MetaTags>
          <title>{title}</title>
          {ssr ? (
            <Fragment>
              <meta
                content={description}
                name="description"
                property="description"
              />
              <meta content={description} property="og:description" />
              <meta content={app.name} property="og:site_name" />
              <meta content={title} property="og:title" />
              <meta content="website" property="og:type" />
              <meta content={`${app.url}`} property="og:url" />
              <meta content={facebook.appId} property="fb:app_id" />
              {/* TODO BRN: Not sure that this is the right type of twitter card */}
              <meta content="summary_large_image" property="twitter:card" />
              <meta content={twitter.username} property="twitter:site" />
              <meta content={description} property="twitter:image:alt" />
            </Fragment>
          ) : null}
        </MetaTags>
        <View style={styles.form}>
          <FieldTextInput
            autoFocus={true}
            disabled={disabled}
            keyboardType="phone-pad"
            label="Login with your phone number"
            name="phoneNumber"
            onSubmitEditing={handleButtonPress}
            returnKeyType="go"
            textContentType="telephoneNumber"
            textInputStyle={styles.textInputStyle}
            validate={[validatePhoneNumber]}
          />
          <TouchableOpacity
            disabled={disabled}
            onPress={handleButtonPress}
            style={[styles.button, disabled ? styles.disabled : styles.enabled]}
          >
            <Text style={styles.buttonText}>Send access code!</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
)

export default LoginPage
