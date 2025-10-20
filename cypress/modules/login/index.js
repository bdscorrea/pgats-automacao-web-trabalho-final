import { faker } from '@faker-js/faker'

// export function preencherFormularioDePreCadastro() {
//     const timestamp = new Date().getTime()

//     cy.get('[data-qa="signup-name"]').type(faker.internet.username())
//     cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`) 
    
//     cy.contains('button','Signup').click()
// }

class Login {
    preencherFormularioDePreCadastro(name, email) {
        const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type(name) 
        cy.get('[data-qa="signup-email"]').type(email) 
    
        cy.contains('button','Signup').click()
    }

    preencherFormularioDeLogin(user, pass) {
        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(pass)   

        cy.get('[data-qa="login-button"]').click()
}
}
export default new Login()