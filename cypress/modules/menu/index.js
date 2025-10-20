class Menu {
    navegarParaLogin() {
     cy.get('a[href="/login"]').click()
}

    efetuarLogout() {
    cy.get('a[href="/logout"]').click()
}

    navegarParaPaginaDeProdutos() {
    cy.get('a[href="/products"]').click()
}

    pesquisarProdutos() {
    cy.get('#search_product').type('top')
    cy.get('#submit_search').click()
}

    navegarParaContatos() {
     cy.get('a[href="/contact_us"]').click()
}
}

export default new Menu()