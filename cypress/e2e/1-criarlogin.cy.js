
import { faker } from '@faker-js/faker'

describe('Automation Exercise - Criar Login', () => {
    beforeEach(() => {
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()
    });

    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type('qa tester')
        cy.get('[data-qa="signup-email"]').type('testesucesso@teste.com')   
        cy.contains('button','Signup').click()

        cy.get('#id_gender2').check()
        cy.get('input#password').type('12345', {log: false})

        cy.get('select[data-qa=days]').select('7')
        cy.get('[data-qa=months]').select('June')
        cy.get('[data-qa=years]').select('1994')

        cy.get('input#first_name').type('qa');
        cy.get('input#last_name').type('tester');
        cy.get('input#company').type('PGATS')
        cy.get('input#address1').type(faker.location.streetAddress());
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state());
        cy.get('input#city').type(faker.location.city());
        cy.get('input#zipcode').type(faker.location.zipCode());
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number());
        
        cy.get('[data-qa="create-account"]').click()

        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
    }); 

    it('Login com Sucesso', () => {

        cy.get('[data-qa="login-email"]').type('testesucesso@teste.com')
        cy.get('[data-qa="login-password"]').type('12345', {log: false})   
        cy.get('[data-qa="login-button"]').click()
 
        cy.contains('b', 'qa tester')
        cy.get(':nth-child(10) > a').should('contain', 'Logged in as qa tester');

        });
});
