import data from '../fixtures/example.json'
import { faker } from '@faker-js/faker'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro';
import carrinho from '../modules/carrinho';
import contato from '../modules/contato';

describe('Automation Exercise Module', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    });

    it('Cadastrar um usuário', () => {
        cy.get('a[href="/login"]').should('be.visible')
        cy.navegarParaLogin()

        const email = faker.internet.email();
        const name = faker.internet.username();
        login.preencherFormularioDePreCadastro(name, email)
        cadastro.preencherFormularioDeCadastroCompleto()

        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
    }); 

    it('Login com Sucesso', () => {
        cy.get('a[href="/login"]').should('be.visible')
        cy.navegarParaLogin()
        login.preencherFormularioDeLogin(data.email, data.pass)
 
        cy.contains('b', 'qa tester')
        cy.get(':nth-child(10) > a').should('contain', 'Logged in as qa tester');

        });
        it('Login Inválido', () => {
            cy.get('a[href="/login"]').should('be.visible')
            cy.navegarParaLogin()
            login.preencherFormularioDeLogin(data.email, '102030')

            cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');
        });

        it('Logout', () => {
            cy.get('a[href="/login"]').should('be.visible')
            cy.navegarParaLogin()
            login.preencherFormularioDeLogin(data.email, data.pass)
            menu.efetuarLogout()

            cy.get('h2').should('contain', 'Login to your account');
            cy.url().should('includes', 'login')

        });

        it('Cadastro de e-mail existente', () => {   
            cy.get('a[href="/login"]').should('be.visible')
            cy.navegarParaLogin()
            login.preencherFormularioDePreCadastro(data.name, data.email)
            cy.contains('button','Signup').click()

            cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
            cy.url().should('includes', 'signup')

        });
        it('Envio de formulário com upload de arquivo', () => {

            menu.navegarParaContatos()
            contato.preencherContato(data)

            cy.get('.status')
            .should('contain.text', 'Success! Your details have been submitted successfully.');

        });

    it('Verificando página de detalhes do produto', () => {
        cy.get('a[href="/login"]').should('be.visible')
        cy.navegarParaLogin()
        menu.navegarParaPaginaDeProdutos()
        cy.url().should('includes', 'products')
        cy.get('#search_product').should('be.visible')
        cy.get('h2').should('contain', 'All Products');

        cy.get('[href="/product_details/1"]').click()
        cy.url().should('includes', 'product_details/1')
        cy.contains('h2', 'Blue Top').should('be.visible');
        cy.contains('Category: Women > Tops').should('be.visible');
        cy.contains('Availability: In Stock').should('be.visible');
        cy.contains('Condition: New').should('be.visible');
        cy.contains('Brand: Polo').should('be.visible');    
    }); 

    it('Pesquisar Produto', () => {
        
        cy.get('a[href="/login"]').should('be.visible')
        cy.navegarParaLogin()

        menu.navegarParaPaginaDeProdutos()
        cy.url().should('includes', 'products')
        cy.get('#search_product').should('be.visible')
        cy.get('h2').should('contain', 'All Products');

        menu.pesquisarProdutos()
        cy.contains('Searched Products').should('be.visible');
        cy.url().should('includes', '/products?search=top') 
    }); 

     it('Verificar a assinatura na página inicial', () => {
        cy.get('a[href="/login"]').should('be.visible')
        cy.navegarParaLogin()

        cy.get('.single-widget > h2').should('be.visible');
        cy.get('#susbscribe_email').type(data.email)
        cy.get('#subscribe').click()
        cy.get('.alert-success').should('be.visible');
    }); 

    it('Fazer Pedido: Cadastrar-se antes de Finalizar a Compra', () => {
        cy.get('a[href="/login"]').should('be.visible')
        cy.navegarParaLogin()
        
        const name = faker.internet.username();
        const email = faker.internet.email();

        login.preencherFormularioDePreCadastro(name, email)
        cadastro.preencherFormularioDeCadastroCompleto()

        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
      
        cy.get('a[data-qa="continue-button"]').click()
        cy.contains(':nth-child(10) > a', `Logged in as ${name}`).should('be.visible');

        carrinho.adicionandoProdutosNoCarrinho()
        carrinho.visualizarCarrinho()
        cy.url().should('includes', 'view_cart')
        cy.contains('Shopping Cart').should('be.visible');

        carrinho.finalizarCompra()

        cy.get('#address_delivery > .address_title > .page-subheading').should('be.visible');
        cy.get(':nth-child(4) > .heading').should('be.visible');

        carrinho.inserirTextoNoComentarioEFazerPedido()
        carrinho.finalizarPedido()
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

        cadastro.excluirConta()
        cy.get('a[href="/login"]').should('be.visible')
    }); 

    it('Fazer Pedido: Efetue login antes de finalizar a compra', () => {
        cy.get('a[href="/login"]').should('be.visible')
        cy.navegarParaLogin()

        login.preencherFormularioDeLogin(data.email, data.pass)

        cy.contains(':nth-child(10) > a', `Logged in as qa tester`).should('be.visible');

        carrinho.adicionandoProdutosNoCarrinho()
        carrinho.visualizarCarrinho()
        cy.url().should('includes', 'view_cart')
        cy.contains('Shopping Cart').should('be.visible');

        cy.finalizarCompra()

        cy.get('#address_delivery > .address_title > .page-subheading').should('be.visible');
        cy.get(':nth-child(4) > .heading').should('be.visible');

        carrinho.inserirTextoNoComentarioEFazerPedido()
        carrinho.finalizarPedido()
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

        cadastro.excluirConta()
        cy.get('a[href="/login"]').should('be.visible')
    }); 
});

//describe ou context -> agrupar testes
//it -> testes em si