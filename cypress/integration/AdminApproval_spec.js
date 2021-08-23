describe('AdminApproval', () => {
<<<<<<< HEAD
<<<<<<< HEAD
  beforeEach(() => {
    cy.fixture('mockUnvetted.json')
      .then(mockData => {
        cy.intercept('GET', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals?vetted=false', {
          statusCode: 201,
          delay: 100,
          body: mockData
        })
      })
    cy.visit('http://localhost:3000/admin_approval_who_dis')
  })

  it('Should display the page title', () => {
    cy.get('.admin-sub-title').should('be.visible')
      .get('.admin-sub-title').should('contain', 'Admin Approval')
      .get('.admin-sub-title').should('have.css', 'font-family', 'opendyslexic')
  })

  it('Should display unvetted healthcare providers', () => {
    cy.get('.provider-card').should('be.visible')
      .get('.first-name').should('be.visible')
      .get('.first-name').should('contain', 'gnat')
      .get('.last-name').should('contain', 'Slowpoke')
      .get('.address').should('contain', 'Daphnechester')
      .get('.specialties').should('contain', 'Orc, Sylvan, Undercommon')
      .get('.insurances').should('contain', 'Schinner, Kreiger and Stokes, Yundt-Cronin, Herman-Bogan')
      .get('.all-unvetted').should('have.length', 1)
  })

  it('Should display an approve and deny button for each card', () => {
    cy.get('.approve-button').should('be.visible')
      .get('.deny-button').should('be.visible')
  })

  it('Should display a message stating there are no unvetted suggestions if all providers are vetted', () => {

  })

  it('Should display an error message when there is an error thrown in the fetch request', () => {

  })

  it('Should make a patch request when the user clicks the approve button', () => {
    cy.fixture('mockVetted.json')
      .then(modifiedData => {
        cy.intercept('PATCH', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals/80', modifiedData)
      })

    cy.fixture('mockVetted.json')
      .then(mockVettedData => {
        cy.intercept('GET', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals?type=doctor&state=Colorado', {
          statusCode: 201,
          body: mockVettedData
        })
      })

      cy.fixture('mockUnvettedModified.json')
      .then(mockData => {
        cy.intercept('GET', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals?vetted=false', {
          statusCode: 201,
          body: mockData
        })
      })

    cy.get('.provider-card').should('be.visible')
      .get('.first-name').should('contain', 'gnat')
      .get('.last-name').should('contain', 'Slowpoke')
      .get('.approve-button').first().click()

    cy.visit('http://localhost:3000/admin_approval_who_dis')
      .get('.provider-card').should('have.length', 1)

    cy.visit('http://localhost:3000/doctors')

    cy.get('.provider-card').should('be.visible')
      .get('.first-name').should('be.visible')
      .get('.first-name').should('contain', 'gnat')
      .get('.last-name').should('contain', 'Slowpoke')
      .get('.address').should('contain', 'Daphnechester')
      .get('.specialties').should('contain', 'Orc, Sylvan, Undercommon')
      .get('.insurances').should('contain', 'Schinner, Kreiger and Stokes, Yundt-Cronin, Herman-Bogan')
  })
=======
  // beforeEach(() => {
  //   cy.fixture('mockDr.json')
  //     .then(mockData => {
  //       cy.intercept('GET', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals?vetted=false', {
  //         statusCode: 201,
  //         delay: 100,
  //         body: mockData
  //       })
  //     })
  //   cy.visit('http://localhost:3000/admin_approval_who_dis')
  // })
=======
  beforeEach(() => {
    // cy.fixture('mockDr.json')
    //   .then(mockData => {
    //     cy.intercept('GET', 'https://head-to-toe-be.herokuapp.com/api/v1/medical_professionals?vetted=false', {
    //       statusCode: 201,
    //       delay: 100,
    //       body: mockData
    //     })
    //   })
    cy.visit('http://localhost:3000/admin_approval_who_dis')
  })
>>>>>>> 01ae36f... Fix syntax errors in test file
  it('Should display the page title', () => {
    cy.get('.admin-sub-title').should('be.visible')
      .get('.admin-sub-title').should('contain', 'Admin Approval')
      .get('.admin-sub-title').should('have.css', 'font-family', 'opendyslexic')
  })
  it('Should display unvetted healthcare providers', () => {

  })
  it('Should display a message stating there are no unvetted suggestions if all providers are vetted', () => {

  })
>>>>>>> 042b861... Set up Cypress testing file
})
