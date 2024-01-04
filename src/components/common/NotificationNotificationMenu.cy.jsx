import React from 'react'
import NotificationMenu from './Notification'

describe('<NotificationMenu />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NotificationMenu />)
  })
})