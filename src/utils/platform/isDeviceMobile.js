import { MOBILE } from '../../constants/DeviceType'

import getPlatformData from './getPlatformData'

const isDeviceMobile = (platformData = getPlatformData()) => {
  const { device } = platformData
  return device.type === MOBILE
}

export default isDeviceMobile
