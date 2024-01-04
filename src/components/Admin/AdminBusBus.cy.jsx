import React from 'react'
import Bus from './AdminBus'

describe('<Bus />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Bus />)
  })
})