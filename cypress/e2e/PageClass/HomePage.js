/// <reference types ='cypress'/>

import HomePageModel from '../PageModel/HomePageModel.js'

const homePage = new HomePageModel()

describe('Test suite for the web shop page.', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'))

    })

    it('End-to-end flow for a web shop.', () => {
        homePage.addProductToCart(['Glasses'], ['Pants'])
        homePage.proceedToCheckout()
        homePage.clickPlaceOrderButton()
        homePage.verifyOrderIsPlaced()
    })

    it('Ensure all links on the website are functioning correctly.', () => {
        homePage.verifyLinkIsWorking()
    })

    it('Sort the products in ascending order of their prices and verify that the resulting list is correctly ordered.', () => {
        homePage.sortPriceListLowToHigh()
    })

    it('Verify that error messages are displayed correctly during checkout.', () => {
        homePage.addProductToCart(['Glasses'])
        homePage.enterErrorMessageForBilling()
    })

    it('Ensure that the cart is updated and reflects the correct price.', () => {
        homePage.addProductToCart(['Socks'])
        homePage.verifyCartIsUpdatedWithPrice('Socks')
    })

    it('Remove the product from the cart.', () => {
        homePage.deleteProductFromCart('Socks')
    })

    it('When a payment is declined, verify that an error message is displayed.', () => {
        homePage.paymentDeclineAndVerifyMessage('Phones')

    })

    it('A user account is created during the checkout process.', () => {
        homePage.createAccount('Phones')
    })

    it('The account is already registered.', () => {
        homePage.accountIsAlreadyRegistered('Socks')
    })
})



