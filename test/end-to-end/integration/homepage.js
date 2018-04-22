describe('Homepage', () => {
  context('mobile', () => {
    beforeEach(() => {
      cy.viewport(360, 640)
    });

    it('displays latest blog entries', () => {
      cy
        .visit('/')
        .get('[class*="latestBlog"]')
        .find('a')
        .should('have.length', 3)
        .first()
        .click()
        .location('pathname')
        .should('contain', '/blog/')
    });
  })
});
