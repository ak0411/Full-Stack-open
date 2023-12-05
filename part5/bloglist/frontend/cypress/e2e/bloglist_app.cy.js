describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'test',
      password: 'user'
    }

    const anotherUser = {
      name: 'Another User',
      username: 'another',
      password: 'user'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('user')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'user' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://docs.cypress.io/guides/overview/why-cypress')
      cy.get('#create-button').click()

      cy.contains('a blog created by cypress')
    })

    it('user can like a blog', function () {

      cy.createBlog({ title: 'blog title', author: 'blog author', url: 'https://blog.io' })

      cy.contains('blog title')
        .contains('show')
        .click()

      cy.contains('likes: 0')

      cy.get('#like-button')
        .click()

      cy.contains('likes: 1')
    })

    it('user who created the blog can delete it', function () {
      cy.createBlog({ title: 'blog title', author: 'blog author', url: 'https://blog.io' })

      cy.contains('blog title')
        .contains('show')
        .click()

      cy.get('#remove-button')
        .click()

      cy.contains('Successfully removed blog title by blog author')
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('only user who created the blog can see the remove button', function () {
      cy.createBlog({ title: 'blog title', author: 'blog author', url: 'https://blog.io' })
      cy.contains('blog title')
        .contains('show')
        .click()
      cy.get('#remove-button')
      cy.get('#logout-button')
        .click()

      cy.login({ username: 'another', password: 'user' })
      cy.contains('blog title')
        .contains('show')
        .click()
      cy.get('#remove-button').should('not.exist')
    })

    describe('add some blogs with likes', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'second most liked blog', author: 'author2', url: 'https://blog2.io', likes: 5 })
        cy.createBlog({ title: 'least liked blog', author: 'author3', url: 'https://blog3.io', likes: 2 })
        cy.createBlog({ title: 'most liked blog', author: 'author1', url: 'https://blog1.io', likes: 10 })
      })

      it('blogs are ordered by their likes', function () {
        cy.get('.blogContent').eq(0).should('contain', 'most liked blog')
        cy.get('.blogContent').eq(1).should('contain', 'second most liked blog')
        cy.get('.blogContent').eq(2).should('contain', 'least liked blog')
      })
    })
  })
})