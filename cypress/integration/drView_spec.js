describe('Doctors Display', () => {

  beforeEach(() => {
      cy.fixture('mockDr.json')
        .then(mockData => {
          cy.intercept('GET', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals?type=doctor&state=Colorado', {
            statusCode: 201,
            body: mockData
          })
        })
      cy.visit('http://localhost:3000/')
    });


  it('Should be able to open to the main page', () => {
    cy.url().should('eq', 'http://localhost:3000/')
  });

  it('Should acknowledge the presence of list of of doctors with a sub title', () => {
    cy.get('#doctors-button').should('be.visible')
      .get('#doctors-button').click()
      .location('pathname').should('eq', '/doctors')

      .get('.dr-sub-title').should('be.visible')
      .get('.dr-sub-title').should('contain', 'Doctor')
      .get('.dr-sub-title').should('have.css', 'font-family', 'opendyslexic')
  });

  it('Should display the doctors page when the doctor button is pressed', () => {
    cy.get('#doctors-button').should('contain', 'Doctors')
      .get('#doctors-button').click()

      .location('pathname').should('eq', '/doctors')
      .get('.dr-sub-title').should('contain', 'Doctors')
  });

  it('Should display the list of doctors for our users to see', () => {
    cy.get('#doctors-button').should('be.visible')
      .get('#doctors-button').click()
      .location('pathname').should('eq', '/doctors')

      .get('.provider-card').should('be.visible')
      .get('.first-name').should('be.visible')
      .get('.first-name').should('contain', 'gnat')
      .get('.last-name').should('contain', 'Slowpoke')
      .get('.address').should('contain', 'Daphnechester')
      .get('.specialties').should('contain', 'Orc, Sylvan, Undercommon')
      .get('.insurances').should('contain', 'Schinner, Kreiger and Stokes, Yundt-Cronin, Herman-Bogan')
      .get('.all-drs').should('have.length', 1)
  });

  it('Should toggle between light and dark mode on click of dark mode button', () => {
    cy.get('#doctors-button').click()
      .location('pathname').should('eq', '/doctors')

    cy.get('.dark-mode-button').should('be.visible')
      .get('.dark-mode-button').should('contain', 'Dark')
      .get('.dark-mode-button').click()

      .get('.dark-mode-button').invoke('val', 25).trigger('change')

  });

  it('Should return to the main page when the home button is clicked', () => {
    cy.get('#doctors-button').click()
      .location('pathname').should('eq', '/doctors')

      .get('.navigation-button').should('be.visible')
      .get('.navigation-button').should('contain', 'Home')
      .get('.navigation-button').click()
      .location('pathname').should('eq', '/')
  });

  it('Should have a controlled input field for insurance whose value reflects the data typed into the form', () => {
    cy.get('#doctors-button').click()
      .get('section input[name="search"]').type('Reichel')
      .get('section input[name="search"]').should('have.value', 'Reichel')
  });

  it('Should clear the inputs when the search button is clicked', () => {
    cy.get('#doctors-button').click()
      .get('form input[name="search"]').type('S')
      .get('#search-button').should('be.visible')
      .get('#search-button').should('contain', 'Search')
      .get('#search-button').click()
      .get('form input[name="search"]').should('have.value', '')
  })

  it('Should be able to filter the cards based on the search parameter', () => {
    cy.get('#doctors-button').click()
      .get('form input[name="search"]').type('S')
      .get('#search-button').click()
      .get('.provider-card-wrapper').children('.card-grid').should('have.length', 2)

      .get('form input[name="search"]').type('Reichel')
      .get('#search-button').click()
      .get('.provider-card-wrapper').children('.card-grid').should('have.length', 1)
  })

  it('Should be give an error message when there are no matching search results', () => {
    cy.get('#doctors-button').click()
      .get('form input[name="search"]').type('bogus insurance')
      .get('#search-button').click()
      .get('#search-error-message').should('contain', 'Sorry! We don\'t have any results for bogus insurance')
  })
});
