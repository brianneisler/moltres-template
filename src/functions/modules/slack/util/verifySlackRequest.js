import { hashHmacSha256 } from '../../../../utils/crypto'

import getSlackAppConfig from './getSlackAppConfig'

const verifySlackRequest = (context, request) => {
  const slackAppId = request.body.api_app_id
  if (!slackAppId) {
    throw new Error('could not find slack app id on request')
  }
  const slackConfig = getSlackAppConfig(context, slackAppId)

  const slackRequestTimestamp = parseInt(
    request.get('X-Slack-Request-Timestamp')
  )
  if (Date.now() - slackRequestTimestamp * 1000 > 60 * 5 * 1000) {
    // The request timestamp is more than five minutes from local time.
    // It could be a replay attack, so let's ignore it.
    return false
  }
  const { rawBody } = request
  const slackSignature = request.get('X-Slack-Signature')
  const signature = hashHmacSha256(
    slackConfig.signingSecret,
    `v0:${slackRequestTimestamp}:${rawBody}`
  )
  return signature === slackSignature
}

export default verifySlackRequest
