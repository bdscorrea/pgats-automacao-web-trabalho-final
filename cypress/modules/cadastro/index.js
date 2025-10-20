import { faker } from "@faker-js/faker";

class Cadastro {
    preencherFormularioDeCadastroCompleto() {
        cy.get('#id_gender2').check()
        cy.get('input#password').type('12345', {log: false})

        //para comboboxes ou selects -> select
        cy.get('select[data-qa=days]').select('7')
        cy.get('[data-qa=months]').select('June')
        cy.get('[data-qa=years]').select('1994')

        cy.get('input#first_name').type(faker.person.firstName());
        cy.get('input#last_name').type(faker.person.lastName());
        cy.get('input#company').type('PGATS')
        cy.get('input#address1').type(faker.location.streetAddress());
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state());
        cy.get('input#city').type(faker.location.city());
        cy.get('input#zipcode').type(faker.location.zipCode());
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number());
        
        cy.get('[data-qa="create-account"]').click()
}

    excluirConta() {
        cy.get('[href="/delete_account"]').click()
        cy.get('[data-qa="continue-button"]').click()
}
}

export default new Cadastro()