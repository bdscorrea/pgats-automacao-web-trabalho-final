import 'cypress-xpath';
import { faker } from '@faker-js/faker'


class Carrinho {
    adicionandoProdutosNoCarrinho() {
        cy.get('a[data-product-id="1"]').first().click()
        cy.xpath('//*[@id="cartModal"]/div/div/div[3]/button').click() 
        cy.get('a[data-product-id="2"]').first().click()
        cy.xpath('//*[@id="cartModal"]/div/div/div[3]/button').click() 
        cy.get('a[data-product-id="3"]').first().click()
        cy.xpath('//*[@id="cartModal"]/div/div/div[3]/button').click() 
    }
    visualizarCarrinho() {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a').click()
    }
    
    finalizarCompra() {
        cy.xpath('//*[@id="do_action"]/div[1]/div/div/a').click()
    }

    inserirTextoNoComentarioEFazerPedido() {
        cy.xpath('//*[@id="ordermsg"]/textarea').type(`${faker.color.human()}: ${faker.animal.cat()}`)
        cy.xpath('//*[@id="cart_items"]/div/div[7]/a').click()
    }
    finalizarPedido() {
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type('03')
        cy.get('[data-qa="expiry-year"]').type('2030')
        cy.get('[data-qa="pay-button"]').click()
    }
}
export default new Carrinho()