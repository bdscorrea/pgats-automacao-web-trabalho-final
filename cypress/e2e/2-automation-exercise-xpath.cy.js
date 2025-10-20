 /// <reference types="cypress" />

 /*
 HOOKS/ganchos:
    - before -> x antes de todos os testes
    - beforeEach -> antes de cada teste
    - after -> x depois de todos os testes
    - afterEach -> depois de cada teste

 */
import 'cypress-xpath';

import data from '../fixtures/example.json'
import { faker } from '@faker-js/faker'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro';
import carrinho from '../modules/carrinho';
import contato from '../modules/contato';

describe('Automation Exercise XPATH', () => {
    beforeEach(() => {
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click()
    });

     it('Exemplos de log', () => {
        cy.log(`Nome do usuario: ${data.name}`)
        cy.fixture('imagem-exemplo.png').as('imagem')
       // cy.xpath('elemento').selectFile('@imagem')
        cy.log(`PGATS AUTOMAÇÃO WEB CONSOLE LOG`)
 }); 

    it('Cadastrar um usuário', () => {
       const timestamp = new Date().getTime()

        cy.xpath('//*[@data-qa="signup-name"]').type(faker.internet.username());
        cy.xpath('//*[@data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`);
        // cy.xpath('//*[@data-qa="signup-button"]').click();
        cy.xpath('//button[contains(text(),"Signup")]').click();

        cy.xpath('//*[@id="uniform-id_gender2"]').click();
        cy.xpath('//*[@id="password"]').type('12345', {log: false})

        //para comboboxes ou selects -> select
        cy.xpath('//*[@id="days"]').select('7')
        cy.xpath('//*[@id="months"]').select('June')
        cy.xpath('//*[@id="years"]').select('1994')

        //cy.xpath('input#first_name').type('Tester')
        cy.xpath('//*[@id="first_name"]').type(faker.person.firstName());
        cy.xpath('//*[@id="last_name"]').type(faker.person.lastName());
        cy.xpath('//*[@id="company"]').type('PGATS')
        cy.xpath('//*[@id="address1"]').type(faker.location.streetAddress());
        cy.xpath('//*[@id="country"]').select('Canada');
        cy.xpath('//*[@id="state"]').type(faker.location.state());
        cy.xpath('//*[@id="city"]').type(faker.location.city());
        cy.xpath('//*[@id="zipcode"]').type(faker.location.zipCode());
        cy.xpath('//*[@id="mobile_number"]').type(faker.phone.number());

        
        cy.xpath('//*[@id="form"]/div/div/div/div/form/button').click()

        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
    }); 

    it('Login com Sucesso', () => {

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type(data.email)
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type(data.pass)   
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()
 
        cy.contains('b', 'qa tester')
        cy.get(':nth-child(10) > a').should('contain', 'Logged in as qa tester');

        });

        it('Login Inválido', () => {

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type('testesucesso@teste.com')
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type('123457', {log: false})   
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()
 
        
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!');

        });

        it('Logout', () => {

        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[2]').type('testesucesso@teste.com')
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/input[3]').type('12345', {log: false})   
        cy.xpath('//*[@id="form"]/div/div/div[1]/div/form/button').click()

 
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').click();

        cy.get('h2').should('contain', 'Login to your account');
        cy.url().should('includes', 'login')

        });

        it('Cadastro de e-mail existente', () => {

        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[2]').type('Email Já Existente')
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/input[3]').type('testesucesso@teste.com')   
        cy.xpath('//*[@id="form"]/div/div/div[3]/div/form/button').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
        cy.url().should('includes', 'signup')

        });
        it('Envio de formulário com upload de arquivo', () => {

        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[8]/a').click()

        cy.xpath('//*[@id="contact-us-form"]/div[1]/input').type(data.name)
        cy.xpath('//*[@id="contact-us-form"]/div[2]/input').type(data.email) 
        cy.xpath('//*[@id="contact-us-form"]/div[3]/input').type(data.subject)   
        cy.xpath('//*[@id="message"]').type(data.message) 

        cy.fixture('imagem-exemplo.png').as('imagem')
        cy.xpath('//*[@id="contact-us-form"]/div[5]/input').selectFile('@imagem')
        
        cy.xpath('//*[@id="contact-us-form"]/div[6]/input').click()

        cy.get('.status')
        .should('contain.text', 'Success! Your details have been submitted successfully.');

        });

     it('Verificando página de detalhes do produto', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
        cy.navegarParaLogin()

        menu.navegarParaPaginaDeProdutos()
        cy.url().should('includes', 'products')
        cy.xpath('//*[@id="search_product"]').should('be.visible')
        cy.xpath('//h2[contains(text(), "All Products")]').should('be.visible');

        cy.xpath('/html/body/section[2]/div[1]/div/div[2]/div/div[2]/div/div[2]/ul/li/a').click()
        cy.url().should('includes', 'product_details/1')
        cy.contains('h2', 'Blue Top').should('be.visible');
        cy.contains('Category: Women > Tops').should('be.visible');
        cy.contains('Availability: In Stock').should('be.visible');
        cy.contains('Condition: New').should('be.visible');
        cy.contains('Brand: Polo').should('be.visible');    
    }); 

    it('Pesquisar Produto', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
        cy.navegarParaLogin()
        menu.navegarParaPaginaDeProdutos()
        cy.url().should('includes', 'products')
        cy.xpath('//*[@id="search_product"]').should('be.visible')
        cy.xpath('//h2[contains(text(), "All Products")]').should('contain', 'All Products');

        menu.pesquisarProdutos()
        cy.contains('Searched Products').should('be.visible');
        cy.url().should('includes', '/products?search=top') 
    }); 

     it('Verificar a assinatura na página inicial', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
        cy.navegarParaLogin()
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
        cy.navegarParaLogin()

        cy.xpath('//div[contains(@class, "single-widget")]/h2').should('be.visible');
        cy.xpath('//*[@id="susbscribe_email"]').type(data.email)
        cy.xpath('//*[@id="subscribe"]').click()
        cy.xpath('//*[contains(@class, "alert-success")]').should('be.visible');
    }); 

    it('Fazer Pedido: Cadastrar-se antes de Finalizar a Compra', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
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

        cy.xpath('//*[@id="address_delivery"]//h3[contains(@class, "page-subheading")]').should('be.visible');
        cy.xpath('//div[4]//*[contains(@class, "heading")]').should('be.visible');

        carrinho.inserirTextoNoComentarioEFazerPedido()
        carrinho.finalizarPedido()
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

        cadastro.excluirConta()
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
    }); 

    it('Fazer Pedido: Efetue login antes de finalizar a compra', () => {
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
        cy.navegarParaLogin()

        login.preencherFormularioDeLogin(data.email, data.pass)

        cy.contains(':nth-child(10) > a', `Logged in as qa tester`).should('be.visible');

        carrinho.adicionandoProdutosNoCarrinho()
        carrinho.visualizarCarrinho()
        cy.url().should('includes', 'view_cart')
        cy.contains('Shopping Cart').should('be.visible');

        cy.finalizarCompra()

        cy.xpath('//*[@id="address_delivery"]//h3[contains(@class, "page-subheading")]').should('be.visible');
        cy.xpath('//div[4]//*[contains(@class, "heading")]').should('be.visible');

        carrinho.inserirTextoNoComentarioEFazerPedido()
        carrinho.finalizarPedido()
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');

        cadastro.excluirConta()
        cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a').should('be.visible')
    }); 
});

//describe ou context -> agrupar testes
//it -> testes em si