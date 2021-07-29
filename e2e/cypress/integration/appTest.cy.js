/* eslint-disable mocha/no-synchronous-tests */

describe('Application Tests', () => {
  it('loads the page.', () => {
    cy.visit('/');

    cy.contains('Ticketeer');
  });
  
  it('when navigating to buy tickets, shows the available tickets.', () => {
    cy.visit('/');

    cy.contains('Ticketeer');
    cy.findByText('Tickets kaufen').click();
    
    cy.contains('Noch 40 mittig verfügbar');

  });
  
  it('submits post request to backend when clicking buy.', () => {
    cy.visit('/');

    // Prevent mutating the backend state as we have not defined a cleanup step (yet).
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:8081/command/buyTickets'
    }, {});

    cy.contains('Ticketeer');
    cy.findByText('Tickets kaufen').click();
    cy.findByLabelText('Gewünschte Anzahl Tickets vorne').type('5');
    cy.findByLabelText('Jetzt kaufen').click();

    cy.findByText('Ticketkauf erfolgreich!')
  });
});
