import React from 'react'
import { StyleSheet } from 'react-native'

import { SubmissionError, validateOneTimeCode } from '../../../utils/form'
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
import {
  FieldTextInput,
  Page,
  Text,
  TouchableOpacity,
  View
} from '../../components'
import { selectAfterLogin } from '../../modules/auth'
import {
  actions as authSMSActions,
  selectAuthSMSChallengeId
} from '../../modules/auth_sms'
import { pushRouteAction } from '../../modules/router/actions'
import { Styles } from '../../styles'

const AUTH_SMS_FORM = 'authSMSForm'

const enhance = compose(
  setDisplayName('LoginCodePage'),
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
    authWithSMSCode: authSMSActions.authWithSMSCode,
    pushRoute: pushRouteAction
  }),
  connect((state) => ({
    afterLogin: selectAfterLogin(state),
    smsChallengeId: selectAuthSMSChallengeId(state)
  })),
  withReduxForm(
    {
      form: AUTH_SMS_FORM
    },
    ({ authWithSMSCode, smsChallengeId }) => ({
      onSubmit: ({ code }) =>
        authWithSMSCode({ code, smsChallengeId }).catch((error) => {
          throw new SubmissionError({ code: error.message })
        })
    })
  ),
  withHandlers({
    handleButtonPress: ({ submit }) => () => submit(AUTH_SMS_FORM)
  }),
  memo
)

const LoginCodePage = enhance(({ handleButtonPress, styles, submitting }) => {
  const disabled = submitting
  return (
    <Page>
      <View style={styles.form}>
        <FieldTextInput
          autoFocus={true}
          disabled={disabled}
          keyboardType="number-pad"
          label="Please enter your auth code"
          name="code"
          onSubmitEditing={handleButtonPress}
          textContentType="oneTimeCode"
          textInputStyle={styles.textInputStyle}
          validate={[validateOneTimeCode]}
        />
        <TouchableOpacity
          disabled={disabled}
          onPress={handleButtonPress}
          style={[styles.button, disabled ? styles.disabled : styles.enabled]}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Page>
  )
})

export default LoginCodePage
