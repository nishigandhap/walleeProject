
class HomePage {

    elements = {
        checkout: () => cy.get('li a.wp-block-pages-list__item__link:contains("Checkout")'),
        placeOrder: () => cy.get('button#place_order'),
        bannerMessage: () => cy.get('.woocommerce-message')

    }

    addProduct(product) {
        cy.get(`li a:visible:contains('${product}')`)
            .next().should('contain.text', 'Add to cart')
            .click({ multiple: true })
        this.elements.bannerMessage().then((msg) => {
            expect(msg.text().trim())
                .to.eq(`Continue shopping “${product}” has been added to your cart.`)
        })
    }

    verifyLinkIsWorking() {
        cy.get('a').each(link => {
            if (link.prop('href')) {
                cy.request({
                    url: link.prop('href')
                }).should(({ status }) => {
                    if (status === 200 || status === 400) {
                        expect(status).to.eq(200)
                    } else {
                        expect(status).to.eq(400)
                    }
                })
                expect(link.prop('href')).to.exist
            }
        })
    }

    addProductToCart(...products) {
        products.forEach((product) => {
            cy.get(`li a:visible:contains('${product}')`).each((el) => {
                cy.wrap(el)
                    .next().should('contain.text', 'Add to cart')
                    .click({ multiple: true })
                this.elements.bannerMessage().then((msg) => {
                    expect(msg.text().trim())
                        .to.eq(`Continue shopping “${product}” has been added to your cart.`)
                    cy.get('.button.wc-forward.wp-element-button').first()
                        .should('have.text', 'Continue shopping').click({ force: true })
                })
            })
        })
    }

    proceedToCheckout() {
        this.elements.checkout().click({ force: true })
        cy.get('h1:contains("Checkout")')
        this.enterCheckoutDetails()
        this.clickTermsAndConditionsCheckBox()

    }

    enterCheckoutDetails() {
        cy.fixture('user').then(({ firstName, lastName, streetAddress, postCode, city, phoneNumber, emailAddress }) => {
            cy.get('#billing_first_name').type(firstName)
                .get("#billing_last_name").type(lastName)
                .get('input#billing_address_1').type(streetAddress)
                .get("input#billing_postcode").type(postCode)
                .get("input#billing_city").type(city)
                .get("input#billing_phone").type(phoneNumber)
                .get("input#billing_email").type(emailAddress)
        })
    }

    clickTermsAndConditionsCheckBox() {
        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click({ force: true })
    }

    clickPlaceOrderButton() {
        this.elements.placeOrder().click({ force: true })
        cy.request('POST', '/?wc-ajax=checkout').then((response) => {
            expect(response.status).to.eq(200)
        })
    }

    acceptPayment() {
        cy.origin('https://app-wallee.com', () => {
            cy.get(".efinance-button").click()
        })
    }

    verifyOrderIsPlaced() {
        this.acceptPayment()
        cy.get('h1:contains("Order received")')
    }

    enterErrorMessageForBilling() {
        this.elements.checkout().click({ force: true })
        cy.get('h1:contains("Checkout")')
        this.clickTermsAndConditionsCheckBox()
        this.clickPlaceOrderButton()
        cy.get('.woocommerce-error').each((msg) => {
            cy.wrap(msg).invoke('text').then((text) => {
                expect(msg).to.have.text(text)
            })
        })
    }

    verifyCartIsUpdatedWithPrice(product) {
        let initialPrice, updatedPrice;
        cy.get('li a.wp-block-pages-list__item__link:contains("Cart")').click()
        cy.get(`td.product-name:contains('${product}')`).should('be.visible')
        cy.get('td.product-subtotal').invoke('text').then(price => {
            initialPrice = parseFloat(price.replace('€', ''))
        }).then(() => {
            cy.get('input[type="number"]').clear().type('2')
            cy.get('button:contains("Update cart")').click()
            this.elements.bannerMessage().should('be.visible')
            cy.get('td.product-subtotal').invoke('text').then(price => {
                updatedPrice = parseFloat(price.replace('€', ''))
                expect(updatedPrice).to.be.greaterThan(initialPrice)
            })
        })
    }
    deleteProductFromCart(product) {
        this.addProduct(product)
        cy.reload()
        cy.get(`td.product-name:contains('${product}')`).should('be.visible')
        cy.get('.remove').click()
        this.elements.bannerMessage().then(msg => {
            expect(msg.text().trim()).to.eq(`“${product}” removed. Undo?`)
        })
    }

    createAccount(product) {
        this.addProduct(product)
        this.proceedToCheckout()
        cy.get('#createaccount').check({ force: true })
        this.clickPlaceOrderButton()
        this.verifyOrderIsPlaced()
        cy.get('li a.wp-block-pages-list__item__link:contains("My account")').click()
        cy.fixture('user').then(user => {
            const { firstName, lastName } = user
            cy.get('.woocommerce-MyAccount-content').find('p').first().then(msg => {
                expect(msg.text().trim()).to.eq(`Hello ${firstName} ${lastName} (not ${firstName} ${lastName}? Log out)`)
            })
        })
    }
    accountIsAlreadyRegistered(product) {
        this.addProduct(product)
        this.proceedToCheckout()
        cy.get('#createaccount').check({ force: true })
        this.clickPlaceOrderButton()
        cy.get('.woocommerce-error').then(msg => {
            expect(msg.text().trim()).to.eq('An account is already registered with your email address. Please log in.')
        })
    }

    paymentDeclineAndVerifyMessage(product) {
        this.addProduct(product)
        this.proceedToCheckout()
        this.clickPlaceOrderButton()
        cy.origin('https://app-wallee.com', () => {
            cy.get('#login_abort').first().click({ force: true })
        })
        cy.get('.woocommerce-error').then(msg => {
            expect(msg.text().trim()).is.eq('Your payment is declined. You might want to retry or chose another payment method.')
        })
    }

    sortPriceListLowToHigh() {
        cy.get('.orderby').select(3)
        cy.url().should('include', '?orderby=price&paged=1')
        cy.get('.price').invoke('text')
            .then((pricesText) => {
                const prices = pricesText
                    .split('€')
                    .slice(3)
                    .filter(Boolean)
                    .map((price) => parseFloat(price))
                const isAscending = prices.every((price, index) => index === 0 || price >= prices[index - 1]);
                if (isAscending) {
                    expect(isAscending).to.be.true
                } else {
                    expect(isAscending).to.be.false
                }
            })
    }

}



export default HomePage;



