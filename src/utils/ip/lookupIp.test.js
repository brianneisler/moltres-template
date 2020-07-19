import lookupIp from './lookupIp'

jest.mock('../request/fetch', () =>
  jest.fn(() => ({
    json: () => ({
      city: 'Seattle',
      country_code: 'US',
      country_name: 'United States',
      ip: '3.4.5.6',
      latitude: 47.6339,
      longitude: -122.3476,
      region_code: 'WA',
      region_name: 'Washington',
      zip_code: '98109'
    }),
    status: 200
  }))
)

describe('lookupIp', () => {
  test('correctly looks up an ip address', async () => {
    expect(await lookupIp('3.4.5.6')).toEqual({
      city: 'Seattle',
      country: 'United States',
      countryCode: 'US',
      ip: '3.4.5.6',
      lat: 47.6339,
      lng: -122.3476,
      postalCode: '98109',
      region: 'Washington',
      regionCode: 'WA'
    })
  })

  test('Throws an error on non ip value', async () => {
    await expect((async () => lookupIp('foo.bar'))()).rejects.toThrow(
      /^Expected an IP address/
    )
  })
})
