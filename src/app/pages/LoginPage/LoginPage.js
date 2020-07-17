import {
  FieldTextInput,
  Page,
  Text,
  TouchableOpacity,
  View
} from '../../components'
import { StyleSheet } from 'react-native'
import { Styles } from '../../styles'
import { SubmissionError, validatePhoneNumber } from '../../../utils/form'
import { actions as authSMSActions } from '../../modules/auth_sms'
import { buildLocation } from '../../../utils/url'
import { compose } from '../../../utils/lang'
import {
  connect,
  defaultProps,
  memo,
  setDisplayName,
  withActions,
  withHandlers,
  withReduxForm
} from '../../../utils/react'
import { pushRouteAction } from '../../modules/router/actions'
import { selectAfterLogin, selectAuthState } from '../../modules/auth'
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
    authState: selectAuthState(state)
  })),
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
  }),
  memo
)

const LoginPage = enhance(({ handleButtonPress, styles, submitting }) => {
  const disabled = submitting
  return (
    <Page description="Login">
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
    </Page>
  )
})

export default LoginPage
