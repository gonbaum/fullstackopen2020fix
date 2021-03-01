describe('Blog app', function() {
  beforeEach(function() {
    //Use testing endpoint to reset database before testing and create a new user
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Gonzalo Garcia',
      username: 'GonzaGC',
      password: '12345'
    }
    const user2 = {
      name: 'Guest User',
      username: 'guest',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown by default', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2020')
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('GonzaGC')
    cy.get('#password').type('12345')
    cy.get('#login-button').click()

    cy.contains('Gonzalo Garcia logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('GonzaGC')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'Gonzalo Garcia logged in')
  })

  describe.only('when logged in', function() {
    beforeEach(function()  {
      cy.login({ username: 'GonzaGC', password: '12345' })
    })

    it('a new blog can be created', function() {
      cy.contains('Create Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first note', author: 'cypress', url: 'www.firstnote.com' })
        cy.createBlog({ title: 'second note', author: 'cypress', url: 'www.secondnote.com' })
        cy.createBlog({ title: 'third note', author: 'cypress', url: 'www.thirdnote.com' })
      })

      it('liking a note increases number of likes showed', function () {

        cy.contains('second note - cypress').parent().find('#ToggleOn').click()
        cy.contains('second note - cypress').parent().parent().find('#likeButton').as('Like')
        cy.get('@Like').click()
        cy.contains('Likes: 1')
        cy.get('@Like').click()
        cy.contains('Likes: 2')
      })

      it('Blog should be ordered by number of likes after refreshing', function () {

        cy.contains('second note - cypress').parent().find('#ToggleOn').click()
        cy.contains('second note - cypress').parent().parent().find('#likeButton').as('Like')
        cy.get('@Like').click()
        cy.contains('Likes: 1')
        cy.get('@Like').click()
        cy.contains('Likes: 2')

        cy.reload()
        cy.get('#containerBlogs').children().children().get('.Blog')
          .should('have.length', 3)
          .then(blogs => {
            cy.wrap(blogs[0]).contains("second note")
            cy.wrap(blogs[1]).contains("first note")
            cy.wrap(blogs[2]).contains("third note")
          })
      })
    })
  })

})