import { URL } from 'url'

import findURL from './findURL'

describe('findURL', () => {
  test('finds a URL in text', async () => {
    const string =
      "Watman recently WAT'd your image https://wat-dev.com/wat/xbRf7k4euvo1QirancLP"
    expect(findURL(string)).toEqual(
      new URL('https://wat-dev.com/wat/xbRf7k4euvo1QirancLP')
    )
  })
})
