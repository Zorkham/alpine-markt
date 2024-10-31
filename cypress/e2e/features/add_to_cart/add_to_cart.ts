import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the home page of the store', () => {
  cy.visit('http://localhost:3000')
  cy.get('body').then(($body) => {
    if ($body.find('.product-item').length) {
      cy.log('Product items are loaded')
    } else {
      cy.log('No product items found')
    }
  })
})

Given('I see a product with the title {string}', (productTitle: string) => {
  cy.contains(productTitle).should('be.visible')
})

When(
  'I click the "Add to Cart" button for the {string}',
  (productTitle: string) => {
    cy.contains(productTitle)
      .parents('.product-item')
      .find('.add-to-cart')
      .click()
  }
)

Then('I should see a message {string}', (message: string) => {
  cy.contains(message).should('be.visible')
})

Then('the cart icon should display {string}', (count: number) => {
  cy.get('.cart-badge').should('contain', count)
})

When(
  'I click the "Minus" button for the {string} on the cart drawer',
  (productTitle: string) => {
    cy.contains('.cart-item', productTitle)
      .should('be.visible')
      .find('.cart-item-minus')
      .click()
  }
)

Then('the cart icon should display {int}', (count: number) => {
  cy.get('.cart-badge').should('contain', count)
})

Then('I click the cart button to open the cart drawer', () => {
  cy.get('.cart-button').click()
  cy.get('.drawer').should('be.visible')
})

Then('I should see the message "Your cart is empty"', () => {
  cy.contains('Your cart is empty').should('be.visible')
})
