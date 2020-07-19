import EventEmitter from 'events'

import getWindow from './getWindow'

const getConnection = () => getWindow().navigator.connection

const formatConnectionNetworkInformation = (information) => {
  const { downlink, effectiveType, rtt, saveData } = information
  let { type } = information
  if (!type) {
    if (rtt === 0) {
      type = 'none'
    } else {
      type = 'other'
    }
  }
  const isConnected = rtt > 0
  return { downlink, effectiveType, isConnected, rtt, saveData, type }
}

const formatRealtimeConnectedNetworkInformation = (snapshot) => {
  const isConnected = snapshot.val()
  const downlink = isConnected ? 1 : 10
  const rtt = isConnected ? 1 : 0
  const effectiveType = '4g'
  const type = isConnected ? 'other' : 'none'
  return {
    downlink,
    effectiveType,
    isConnected,
    rtt,
    saveData: false,
    type
  }
}

class NetworkInformation extends EventEmitter {
  constructor({ realtime }) {
    super()
    this.connection = getConnection()
    this.realtime = realtime

    if (this.connection) {
      this.connection.addEventListener(
        'change',
        this.handleConnectionChangeEvent
      )
    } else {
      realtime
        .ref('.info/connected')
        .on('value', this.handleRealtimeConnectedInfo)
    }
  }

  async fetch() {
    if (this.connection) {
      return formatConnectionNetworkInformation(this.connection)
    }
    const snapshot = await this.realtime.ref('.info/connected').once('value')
    return formatRealtimeConnectedNetworkInformation(snapshot)
  }

  handleConnectionChangeEvent = () => {
    this.emit('change', formatConnectionNetworkInformation(this.connection))
  }

  handleRealtimeConnectedInfo = (snapshot) => {
    this.emit('change', formatRealtimeConnectedNetworkInformation(snapshot))
  }
}

let networkInformation = null
const getNetworkInformation = (context) => {
  if (!networkInformation) {
    networkInformation = new NetworkInformation(context)
  }
  return networkInformation
}

export default getNetworkInformation
