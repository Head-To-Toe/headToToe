describe('Show landing page of Head To Toe', () => {

  beforeEach(() => {
    cy.fixture('mockDr.json')
      .then(mockData => {
        cy.intercept('GET', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals?type=doctor&state=Colorado', {
          statusCode: 201,
          delay: 100,
          body: mockData
        })
      })
    cy.visit('http://localhost:3000/')
  });

  it('Should be able to open to the main page', () => {
  cy.url().should('eq', 'http://localhost:3000/')
  });

  it('Should be show a radial gradient covering the main page view', () => {
    cy.get('html').should('have.css', 'background-image', 'linear-gradient(rgb(0, 73, 73), rgb(109, 182, 255), rgb(0, 146, 146))')
  });

  it('Should display the title on the main page', () => {
  cy.get('.main-title').should('be.visible', 'Head To Toe')
    .get('.main-title').should('contain', 'Head To Toe')
    .get('.main-title').should('have.css', 'font-family', 'opendyslexic')
  });

  it('Should display the form, dr and mhp buttons for user', () => {
    cy.get('#doctors-button').should('be.visible')
      .get('#doctors-button').should('contain', 'Doctors')

      .get('#mental-health-pros-button').should('be.visible')
      .get('#mental-health-pros-button').should('contain', 'Mental')

      .get('#submit-button').should('be.visible')
      .get('#submit-button').should('contain', 'Suggest')

      .get('.dark-mode-button').should('be.visible')
      .get('.dark-mode-button').should('contain', 'Dark')
  });

  it('Should have buttons with accessability friendly font', () => {
    cy.get('.main-buttons').should('have.css', 'font-family', 'opendyslexic')
  });

  it('Should allow the user to navigate away to their chosen page upon click', () => {
    cy.get('#doctors-button').click()
      .location('pathname').should('eq', '/doctors')

      .get('#mental-health-pros-button').click()
      .location('pathname').should('eq', '/mental_health_professionals')

      .get('#submit-button').click()
      .location('pathname').should('eq', '/submit')
  });

  it('Should display the mission statement of our project', () => {
    cy.get('.mission').should('be.visible')
      .get('.mission').should('contain', 'At Head To Toe')
  });

});
