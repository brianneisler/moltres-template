// POST https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=api_key
// Content-Type: application/json

/**
 *
 * @param {*} context
 * @param {{
 *   "dynamicLinkInfo": {
 *     "domainUriPrefix": string,
 *     "link": string,
 *     "androidInfo": {
 *       "androidPackageName": string,
 *       "androidFallbackLink": string,
 *       "androidMinPackageVersionCode": string
 *     },
 *     "iosInfo": {
 *       "iosBundleId": string,
 *       "iosFallbackLink": string,
 *       "iosCustomScheme": string,
 *       "iosIpadFallbackLink": string,
 *       "iosIpadBundleId": string,
 *       "iosAppStoreId": string
 *     },
 *     "navigationInfo": {
 *       "enableForcedRedirect": boolean,
 *     },
 *     "analyticsInfo": {
 *       "googlePlayAnalytics": {
 *         "utmSource": string,
 *         "utmMedium": string,
 *         "utmCampaign": string,
 *         "utmTerm": string,
 *         "utmContent": string,
 *         "gclid": string
 *       },
 *       "itunesConnectAnalytics": {
 *         "at": string,
 *         "ct": string,
 *         "mt": string,
 *         "pt": string
 *       }
 *     },
 *     "socialMetaTagInfo": {
 *       "socialTitle": string,
 *       "socialDescription": string,
 *       "socialImageLink": string
 *     }
 *   },
 *   "suffix": {
 *     "option": "SHORT" or "UNGUESSABLE"
 *   }
 * }} dynamicLink
 */
const createDynamicLink = async (context, dynamicLink) => {
  throw new Error(`TODO: implement - dynamicLink:${dynamicLink}`)
}

export default createDynamicLink
