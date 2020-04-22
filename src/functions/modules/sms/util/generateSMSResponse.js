import generateMessagingResponse from './generateMessagingResponse'
import generateResponses from './generateResponses'

const generateSMSResponse = async (context, data) => {
  const { response } = data
  const responses = await generateResponses(context, data)
  const messagingResponse = generateMessagingResponse(responses)
  response.writeHead(200, { 'Content-Type': 'text/xml' })
  response.end(messagingResponse.toString())
}

export default generateSMSResponse
