import { Platform } from 'react-native'

import { DeviceType, OSType, PlatformType } from '../../constants'
import { getPropertyOr, weakMemoize } from '../lang'

import getUserAgentData from './getUserAgentData'

/**
 * @private
 * @returns ({
 *   browser: String,
 *   cpu: String,
 *   device: String,
 *   engine: String,
 *   native: Boolean,
 *   os: String,
 *   platform: String,
 *   ua: String
 * })
 */
const getPlatformData = weakMemoize(() => {
  switch (Platform.OS) {
    case PlatformType.ANDROID:
      return {
        browser: null,
        cpu: null, // TODO BRN: Determine how to figure this out in react-native
        device: null, // TODO BRN: Determine how to figure this out in react-native
        engine: null,
        native: true,
        os: OSType.ANDROID,
        platform: PlatformType.ANDROID,
        ua: null
      }
    case PlatformType.IOS:
      return {
        browser: null,
        cpu: null, // TODO BRN: Determine how to figure this out in react-native
        device: null, // TODO BRN: Determine how to figure this out in react-native
        engine: null,
        native: true,
        os: OSType.IOS,
        platform: PlatformType.IOS,
        ua: null
      }
    case PlatformType.WEB:
      const uaData = getUserAgentData()
      return {
        ...uaData,
        device: getPropertyOr(DeviceType.DESKTOP, 'device', uaData),
        native: false,
        platform: PlatformType.WEB
      }
  }
})

export default getPlatformData
