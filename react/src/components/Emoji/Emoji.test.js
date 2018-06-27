import React from 'react'
import Enzyme, { render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Emoji from './Emoji'

Enzyme.configure({ adapter: new Adapter() })

it('converts basic emoji using sweat_smile', () => {
  const rendered = render(<Emoji name="sweat_smile" />)

  expect(rendered).toMatchSnapshot()
})

it('converts basic emoji using grinning', () => {
  const rendered = render(<Emoji name="grinning" />)

  expect(rendered).toMatchSnapshot()
})
