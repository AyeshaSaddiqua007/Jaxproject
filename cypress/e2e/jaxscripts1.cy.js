describe('Jax Website Tests', () => {
  it('should check various elements on the landing page', () => {
    cy.visit('https://jax.de/mainz/');
    const COOKIE_NAME = "real_cookie_banner-blog:1-lang:de";
    const COOKIE_VALUE = "2cce1d1d-6f7a-47c2-ae56-41d4137a3a29%3A13519d7138018655e01719c9faecb41b%3A%7B%221740%22%3A%5B87377%2C87401%2C87393%2C87397%2C87389%2C87385%2C87246%5D%2C%221745%22%3A%5B87350%2C88494%2C87368%2C87370%2C87501%2C87418%2C87403%2C87372%5D%7D";
    Cypress.on("window:before:load", window => {
      window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
    });
    cy.clearCookies();

    // Check if the language switch button is clickable
    cy.get('#menu-main-menu-jax-1 > .lang-item').should('be.visible').should('not.be.disabled');

    // Check if the "Program" menu exists
    cy.get('#menu-main-menu-jax-1 > li:nth-child(2)').should('be.visible').should("contain",
      "Programm");

    // Navigate to the Program page
    cy.get('#menu-main-menu-jax-1 > li:nth-child(2)').should('be.visible').click();

    // Check if Vue app data is visible
    cy.get('#timetable-overview-custom').should('be.visible').find('div').should('have.length.greaterThan', 0);

    // Click on a session to reach details
    cy.get('#programJumpToDay0 > :nth-child(4)').should('be.visible').click();

    // Check if session details are visible
    cy.get('.sands-flex-container').should('be.visible');

    // Click on a speaker to reach details
    cy.get('.speaker-boxes').should('be.visible');
    cy.get('.span-speaker-container').should('be.visible').click();
  });
});