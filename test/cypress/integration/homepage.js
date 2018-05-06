import viewports from '../viewports';

describe('Homepage', () => {
  viewports.forEach(({ name, viewport }) => {
    context(name, () => {
      beforeEach(() => {
        cy.viewport(...viewport);
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
          .should('contain', '/blog/');
      });
    });
  });
});
