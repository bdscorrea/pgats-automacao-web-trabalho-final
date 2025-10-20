class Contato {
    preencherContato(data) {
        cy.get('[data-qa="name"]').type(data.name)
        cy.log(data.name)
        cy.get('[data-qa="email"]').type(data.email) 
        cy.get('[data-qa="subject"]').type(data.subject)   
        cy.get('[data-qa="message"]').type(data.message) 

        cy.fixture('imagem-exemplo.png').as('imagem')
        cy.get('input[type=file]').selectFile('@imagem')
        
        cy.get('[data-qa="submit-button"]').click()
}
}

export default new Contato()