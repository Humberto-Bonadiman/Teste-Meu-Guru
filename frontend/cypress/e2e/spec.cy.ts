/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Test the page "users/1"', () => {
  it('test component UserInformation', () => {
    cy.visit('http://localhost:3000/users/1');
    cy.get('[data-testid="form-label"]').should('have.text', 'Nome ou E-mail');
    cy.get('[data-testid="input-name"]');
    cy.get('[data-testid="form-button-verify"]').should('have.text', 'Verificar');
    cy.get('[data-testid="form-button-return"]').should('have.text', 'Voltar');
  });
  it('test component TableUsers', () => {
    cy.visit('http://localhost:3000/users/1');
    cy.get('[data-testid="table-header-id"]').should('have.text', 'Id');
    cy.get('[data-testid="table-header-name"]').should('have.text', 'Nome');
    cy.get('[data-testid="table-header-email"]').should('have.text', 'E-mail');
  });
  it('search for Hugo in the database', () => {
    cy.visit('http://localhost:3000/users/1');
    cy.get('[data-testid="input-name"]').type('Hugo');
    cy.get('[data-testid="form-button-verify"]').click();
    cy.get('[data-testid="table-data-name-0"]').contains('Hugo');
    cy.get('[data-testid="form-button-return"]').click();
    cy.get('[data-testid="table-data-name-0"]').should('not.contain', 'Hugo');
    cy.get('[data-testid="form-button-return"]').should('be.disabled');
  });
})