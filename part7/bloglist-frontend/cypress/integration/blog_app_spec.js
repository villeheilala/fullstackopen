/* eslint-disable */
/// <reference types="Cypress" />

describe('Blog', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', () => {
    cy.contains('log in')
  })

  it('login with wrong password shows error', () => {
    cy.get('#username').type('matti.mainio')
    cy.get('#password').type('wrongpassword')
    cy.contains('kirjaudu').click()
    cy.contains('wrong')
  })

  it('user can login', () => {
    cy.get('#username').type('matti.mainio')
    cy.get('#password').type('password')
    cy.contains('kirjaudu').click()
    cy.contains('logged in')
  })
})