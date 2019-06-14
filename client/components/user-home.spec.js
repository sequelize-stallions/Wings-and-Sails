/* global describe beforeEach it */

import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

xdescribe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(
      <UserHome
        email="cody@email.com"
        getCart={() => 'Placeholder for getCart'}
        getOrders={() => 'Placeholder for getOrders'}
      />
    )
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
