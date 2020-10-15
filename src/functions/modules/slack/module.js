import { StatusCode } from '../../../constants'
import {
  createEvent,
  processEventAction,
  queueProcessEventAction
} from '../../../core/modules/event'
import { encodeContentType } from '../../../utils/request'
import { rfc3339TimestampString } from '../../../utils/time'

import { SlackConfig } from './schemas'
import { isRequestChallenge, verifySlackRequest } from './util'

const mod = () => ({
  async handleEventRequest(context, request, response) {
    if (process.env.NODE_ENV === 'production') {
      if (!verifySlackRequest(context, request)) {
        return response
          .type('text/plain')
          .status(StatusCode.ACCESS_DENIED)
          .send('Slack Request Verification Failed.')
          .end()
      }
    }
    if (isRequestChallenge(request)) {
      return response
        .type('text/plain')
        .status(StatusCode.SUCCESS)
        .send(request.body.challenge)
        .end()
    }

    const contentType = request.get('content-type')
    const { body } = request
    const event = await createEvent(context, {
      data: encodeContentType(contentType, body),
      datacontenttype: contentType,
      id: `${body.team_id}:${body.event_id}`,
      source: 'https://slack.com/api',
      specversion: '1.0',
      subject: 'slack',
      time: rfc3339TimestampString(new Date(body.event_time * 1000)),
      type: body.event.type
    })
    await queueProcessEventAction(
      context,
      processEventAction({
        eventId: event.id
      })
    )
    response.sendStatus(StatusCode.SUCCESS)
  }
})

mod.configSchema = SlackConfig

export default mod
